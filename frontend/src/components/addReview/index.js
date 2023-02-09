import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddReview from './addReview';
import './addReview.css'

function AddReviewModal() {
  const [addReviewModal, setAddReviewModal] = useState(false);

  return (
    <>
      <button
              className='createReviewButton'
              onClick={() => {
                setAddReviewModal(true)
                // addReview(spotId);
              }}
            >
              Create Review
            </button>
      {addReviewModal && (
        <Modal onClose={() => setAddReviewModal(false)}>
          <AddReview setAddReviewModal={setAddReviewModal} />
        </Modal>
      )}
    </>
  );
}

export default AddReviewModal;
