import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpot from './editSpot';
import './editSpot.css'


function EditSpotModal({spot}) {
  const [editSpotModal, setEditSpotModal] = useState(false);
  // console.log('editSpot modal///////////')
  return (
    <>

            <button
              className='editButton'
              onClick={() => {
                setEditSpotModal(true)
                // history.push(`${oneSpot.id}/edit`);
              }}
            >
              Edit Spot
            </button>

      {editSpotModal && (
        <Modal onClose={() => setEditSpotModal(false)}>
          <EditSpot setEditSpotModal={setEditSpotModal} spot={spot} />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
