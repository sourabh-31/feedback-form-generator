import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PlusIcon from "@assets/plus.svg";
import Heading from "@components/shared/Heading";
import Modal from "@components/shared/Modal";
import { useModal } from "@hooks/useModal";
import { handleFormName } from "@redux/features/formPropSlice";

export default function AddNewForm() {
  const [formName, setFormName] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const { close } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateForm = () => {
    if (formName.trim() === "") {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    dispatch(handleFormName(formName));
    navigate("/customize");
    close();
  };

  return (
    <>
      {/* Modal Open */}
      <Modal.Open opens="add-new-form">
        <button className="flex h-[24rem] w-80 flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white shadow">
          <img src={PlusIcon} alt="plus-icon" className="size-12" />
          <Heading heading="New Form" className="tracking-wide" />
        </button>
      </Modal.Open>

      {/* Add Feedback Form Modal Window */}
      <Modal.Window name="add-new-form">
        <div>
          <Heading heading="Create feedback form" weight="normal" size="2xl" />
          <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <input
              placeholder="Enter feedback form name"
              name="urlConditions"
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="mt-3 w-[20rem] border-b-2 border-gray-600 py-2 font-workSans text-lg font-medium text-gray-600 outline-none placeholder:font-normal sm:w-[30rem]"
            />
          </motion.div>
          {/* Buttons */}
          <div className="-mb-2 mt-10 flex items-center justify-end gap-6 font-kanit text-xl font-medium">
            <button className="text-[#189657]" onClick={handleCreateForm}>
              Create
            </button>
            <button className="text-gray-400" onClick={() => close()}>
              Cancel
            </button>
          </div>
        </div>
      </Modal.Window>
    </>
  );
}
