import React from "react";

import EditableWishlistTitle from "./WishlistName/WishlistName";
import ModalCreateList from "./ModalCreateList";
import WishlistPrivacyOptions from "./WishlistPrivacyOptions";
import styles from "../styles.css";

const WishlistMobile = ({
  selectedWishlist,
  wishlists,
  wishlist,
  fetchData,
  handleSelectWishlist,
  emailIDInfo,
  buttonModalTable,
  isModalAccountTable,
  handleSubmitDataTable,
  createWishlist,
  userEmail,
  setFieldValidationTable,
  nameListAccountTable,
  setNameListAccountTable,
  setIsModalAccountTable,
  deleteWishlist,
  buttonCloseModalTable,
  handleNameListTable,
  fieldValidationTable,
}) => {
  return (
    <div id="wish-list-mobile">
      {/* Mobile Design */}

      <div className={styles.wishlistOptionsContainer}>
        <div className={styles.wishlistSelector}>
          <p className={styles.wishlistSelectListOneText}>Favourites List</p>
          <div className={`${styles.createListandAndSelectFav}`}>
            <select
              className={styles.wishlistSelectListOne}
              id="selectListTable"
              onChange={(e) => {
                handleSelectWishlist(e.target.value);
              }}
              size={1}
              value={selectedWishlist}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              {emailIDInfo.map((newDates) => (
                <option
                  className={styles.wishlistSelectListOneOption}
                  value={newDates.value}
                  key={newDates.value}
                  id={newDates.value}
                >
                  {newDates.label}
                </option>
              ))}
            </select>
            <section>
              <button
                className={`${styles.wishlistCreateNew} ${styles.wishlistCreateNewHelper}`}
                onClick={buttonModalTable}
              >
                New
              </button>
              {isModalAccountTable && (
                <ModalCreateList
                  buttonCloseModal={buttonCloseModalTable}
                  handleNameList={handleNameListTable}
                  fieldValidation={fieldValidationTable}
                  handleSubmitData={(event) =>
                    handleSubmitDataTable(
                      event,
                      createWishlist,
                      userEmail,
                      setFieldValidationTable,
                      nameListAccountTable,
                      setNameListAccountTable,
                      setIsModalAccountTable,
                      fetchData
                    )
                  }
                />
              )}
            </section>
          </div>
        </div>
      </div>

      <div className={`${styles.nameAndOptionsMobile}`}>
        <EditableWishlistTitle
          initialTitle={selectedWishlist !== null ? wishlist.wishlistType : ""}
          wishlistId={
            selectedWishlist !== null ? selectedWishlist : wishlists[0].id
          }
          wishlist={selectedWishlist !== null ? wishlist : wishlists[0]}
          fetchData={fetchData}
        />
        <div className={`${styles.optionsMobile}`}>
          <WishlistPrivacyOptions
            selectedWishlist={
              selectedWishlist !== null ? selectedWishlist : wishlists[0].id
            }
            wishlists={wishlists}
            buttonLabel="Share"
          />
          <button
            className={styles.wishlistDeleteWishList}
            onClick={() => deleteWishlist()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistMobile;
