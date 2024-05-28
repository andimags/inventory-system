import Swal from "sweetalert2";

export const showLoading = () => {
    Swal.fire({
        title: "Loading products...",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
        backdrop: `
        rgba(0,0,123,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    });
};

export const hideSwal = () => {
    Swal.close();
};

export const showAlert = (title, text, icon) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        timer: 2000,
    });
};
