import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../config/firebaseConfig";
import { warningMessage } from "./Alert";
/**
 * Handle Upload
 * @param {object} file
 * @param {function} setPercent
 * @param {function} setImage
 **/
export function handleUpload({ file, setPercent, setImage }) {
  if (!file) {
    warningMessage("Warning", "Please select an image");
    return;
  }

  const storageRef = ref(storage, `/images/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      // update upload progress
      setPercent(percent);
    },
    (err) => console.log(err),
    () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setImage(url);
      });
    }
  );
}
