// import React, { useRef, useState } from "react";
// import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
// const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
//   const inputRef = useRef(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const handleImageChange = (event) => {
//     const file = event.target.file[0];
//     if (file) {
//       setImage(false);
//       const preview = URL.createObjectURL(file);
//       if (setPreview) {
//         setPreview(preview);
//       }
//       setPreviewUrl(preview);
//     }
//   };
//   const handleRemoveImage = () => {
//     setImage(null);
//     setPreview(null);
//     if (setPreview) {
//       setPreview(null);
//     }
//   };
//   const onChooseFile = () => {
//     inputRef.current.click();
//   };
//   return (
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         ref={inputRef}
//         onChange={handleImageChange}
//         name=""
//         id=""
//       />
//       {!image ? (
//         <div className="">
//           <LuUser className="" />
//           <button type="button" className="" onClick={onChooseFile}>
//             <LuUpload />
//           </button>
//         </div>
//       ) : (
//         <div className="">
//           <img src={preview || previewUrl} alt="profule photo" className="" />
//           <button className="" type="button" onClick={handleRemoveImage}>
//             <LuTrash />{" "}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePhotoSelector;
import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center mb-5">
      {/* hidden input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="flex flex-col items-center gap-3">
          {/* Avatar placeholder */}
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200">
            <LuUser size={32} className="text-gray-500" />
          </div>

          {/* Upload button */}
          <button
            type="button"
            onClick={onChooseFile}
            className="flex items-center gap-2 text-sm text-orange-600 hover:underline"
          >
            <LuUpload size={16} />
            Upload Photo
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          {/* Preview image */}
          <img
            src={previewUrl}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border"
          />

          {/* Remove button */}
          <button
            type="button"
            onClick={handleRemoveImage}
            className="flex items-center gap-2 text-sm text-red-500 hover:underline"
          >
            <LuTrash size={16} />
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
