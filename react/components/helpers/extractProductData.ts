const extractProductData = ({ items }) => {
  return items?.map(
    ({
      ID,
      Image,
      department,
      skuCodeReference,
      nameProduct,
      quantityProduct,
      unitValue,
      linkProduct,
      bundle,
      notes,
      skuName,
      description,
    }) => {
      const pr = {
        id: ID,
        image: Image,
        department,
        skuReferenceCode: skuCodeReference,
        name: nameProduct,
        quantity: quantityProduct,
        unitValue,
        totalValue: unitValue * quantityProduct,
        linkProduct,
        bundle: bundle || null,
        notes,
        skuName,
        description,
      }

      return pr
    }
  )
}

export default extractProductData
