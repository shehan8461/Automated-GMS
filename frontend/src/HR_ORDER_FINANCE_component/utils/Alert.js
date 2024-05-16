import Swal from "sweetalert2";

/**
 * @param {string} title
 * @param {string} message
 * @param {function} event
 * @returns {void}
 * @example
 * confirmMessage("Are you sure?", "You won't be able to revert this!", () => {
 *  console.log("Confirmed");
 * }
 * );
 **/
export function confirmMessage(title, message, event) {
  Swal.fire({
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    title: `<span class="text-md font-semibold">${title}</span>`,
    html: `<span class="text-md font-semibold">${message}</span>`,
    icon: "warning",
    customClass: {
      title: "text-md",
    },
    padding: "1rem",
  }).then((result) => {
    if (result.isConfirmed) {
      event();
    }
  });
}

/**
 * @param {string} title
 * @param {string} message
 * @returns {void}
 * @example
 * successMessage("Success", "Your Report has been downloaded");
 **/
export function successMessage(title, message, event) {
  Swal.fire({
    title: `<span class="text-md font-semibold">${title}</span>`,
    html: `<span class="text-md font-semibold">${message}</span>`,
    timer: 2000,
    timerProgressBar: true,
    icon: "success",
    customClass: {
      title: "text-md",
    },
    padding: "1rem",
  }).then(() => {
    if (event) {
      event();
    }
  });
}

/**
 * @param {string} title
 * @param {string} message
 * @returns {void}
 * @example
 * errorMessage("Error", "Something went wrong");
 **/
export function errorMessage(title, message) {
  Swal.fire({
    title: `<span class="text-md font-semibold">${title}</span>`,
    html: `<span class="text-md font-semibold">${message}</span>`,
    icon: "error",
    customClass: {
      title: "text-md",
    },
    padding: "1rem",
  });
}

/**
 * @param {string} title
 * @param {string} message
 * @returns {void}
 * @example
 * warningMessage("Warning", "Are you sure?");
 **/
export function warningMessage(title, message) {
  Swal.fire({
    title: `<span class="text-md font-semibold">${title}</span>`,
    html: `<span class="text-md font-semibold">${message}</span>`,
    icon: "warning",
    customClass: {
      title: "text-md",
    },
    padding: "1rem",
  });
}
