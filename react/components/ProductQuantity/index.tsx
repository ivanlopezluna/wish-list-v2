import React, { useState, useEffect, useRef, useContext } from 'react'
import { NumericStepper, ToastContext } from 'vtex.styleguide'

// Assuming you have a type for NumericStepper
type NumericStepperRef = {
  inputFocused: boolean;
  // Add other properties/methods if needed
};

export const ProductStepper = ({
  initialQty,
  wishlist: initialWishlist,
  bundle,
  updateWishlist,
  skuReferenceCode,
}) => {
  // console.log(`%c ProductStepper:Props`, 'color: LimeGreen', {initialQty, initialWishlist, bundle, updateWishlist, skuReferenceCode})
  const [QTY, setQTY] = useState(initialQty)
  const [tempValue, setTempValue] = useState(initialQty)
  const wishlistRef = useRef(initialWishlist)
  const numericStepperRef = useRef<NumericStepperRef | null>(null)

  const { showToast } = useContext<any>(ToastContext)

  useEffect(() => {
    setQTY(initialQty)
  }, [initialQty])

  useEffect(() => {
    wishlistRef.current = initialWishlist
  }, [initialWishlist])

  useEffect(() => {
    const checkInputFocused = () => {
      if (numericStepperRef.current && numericStepperRef.current.inputFocused){
        console.log(`%c>> Marker: Input focused`, 'color: LimeGreen')
      }
      else {
        console.log(`%c>> Marker: Input not focused`, 'color: Tomato')
        modifyProductQTY(tempValue, 'change')
      }
    }

    const interval = setInterval(checkInputFocused, 1000)

    return () => clearInterval(interval)
  }, [tempValue])

  const modifyProductQTY = (newValue: string, eventType: string) => {
    console.log(`%cfn.modifyProductQTY`, 'color: Orange', {newValue, eventType})
    const quantity = Number(newValue)
    const roundedQuantity =
      eventType === 'change'
        ? Math.max(quantity - (quantity % bundle), bundle)
        : Math.max(bundle, quantity)

    const finalValue = roundedQuantity + (quantity - roundedQuantity)
    console.log(`%c modifyQTY`, 'color: DarkTurquoise', {initialQty, bundle, quantity, roundedQuantity, finalValue})

    setQTY(finalValue)

    const updatedProducts = wishlistRef?.current?.products?.map(
      (product: { skuCodeReference: string }) =>
        product.skuCodeReference === skuReferenceCode
          ? { ...product, quantityProduct: finalValue }
          : product
    )
  
    // return
    updateWishlist({
      variables: {
        wishlist: {
          id: wishlistRef.current.id,
          products: updatedProducts,
        },
      },
    })
      .then(() => {
        showToast(`Quantity updated ${finalValue}`)
      })
      .catch((error: unknown) => {
        console.error('Error updating products:', error)
      })
  }

  useEffect(() => {
    console.log(`%c QTY`, 'color: DarkTurquoise', {QTY})
  }, [QTY])

  return (
    <NumericStepper
      ref={numericStepperRef}
      value={QTY}
      size="small"
      onChange={(e: { value: string; type: string }) => {
        console.log(`%c event`, 'color: DarkTurquoise', {e})
        setTempValue(e.value)
      }}
    />
  )
}
