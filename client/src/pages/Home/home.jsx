import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/navbar'
import Notecard from '../../components/cards/notecard'
import axiosInstance from '../../utils/axiosInstance'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './addEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from "../../assets/images/notes_img.jpg"
import NoDataImg from "../../assets/images/blank_note.png"

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  })

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    })
  }
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    })
  }

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    }
    catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get All notes

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    }
    catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  }

  // DELETE note

  const deleteNote = async (data) => {
    const noteId = data?._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note deleted Successfully", 'delete')
        getAllNotes()
      }
    } catch (error) {
      if (error.response && error.reponse?.data && error.reponse?.data.message) {
        console.log("An unexpected error occured. Please try again.");
      }
    }
  }

  // Search for a Note

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      })

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(() => {
    getAllNotes()
    getUserInfo();
    return () => { };
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className='container mx-auto'>
        {allNotes.length > 0 ?
          (<div className='grid grid-cols-4 gap-5 mt-10 '>
            {allNotes.map((item, index) => (
              <Notecard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}

              />
            ))}

          </div>) : (
            <EmptyCard imgSrc={isSearch ? NoDataImg : AddNotesImg} message={isSearch ? "Ooops! No notes found matching your search" : "Start creating your first Note!  Click the 'Add' button to join your thoughts,ideas and reminders. Let's get Started"} />
          )
        }
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-3xl bg-midnight hover:bg-blue-500 absolute right-10 bottom-10' onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data: null });
      }}>
        <MdAdd className='text-[32] text-white' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown} onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll "
      >

        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />

    </>
  )
}

export default Home
