import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ modal, setModal }) {
  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="text-black">Formularz kontaktowy</h4>
          <form className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Imię"
              className="p-2 border border-gray-400 rounded-md"
            />
            <input
              type="text"
              placeholder="Nazwisko"
              className="p-2 border border-gray-400 rounded-md"
            />
            <input
              type="tel"
              placeholder="Telefon"
              className="p-2 border border-gray-400 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-400 rounded-md"
            />
            <input
              type="text"
              placeholder="Adres dostawy"
              className="p-2 border border-gray-400 rounded-md"
            />
            <textarea
              placeholder="Informacje dodatkowe"
              className="p-2 border border-gray-400 rounded-md"
            />
            <p className="text-black text-xs">
              Przesyłając ten formularz, wyrażam zgodę na przetwarzanie moich
              danych osobowych w celu udzielenia odpowiedzi na moje zapytanie
              oraz na otrzymywanie informacji handlowych i marketingowych drogą
              elektroniczną od AcelGarage. Więcej informacji na temat przetwarzania
              danych osobowych można znaleźć w Polityce Prywatności.
            </p>
            <button className="bg-slate-900 text-white p-2 rounded-md">
              Wyślij
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
