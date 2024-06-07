export const styleess = {
  tableCellHeader: {
    fontWeight: "bold",
    fontSize: "1.2em"
  },
  tableCellTable: {
    fontSize: "1em" // 1em
    // fontWeight: "bold"
  },
  ButonNuenva: {
    color: "white",
    backgroundColor: "#0A8920",
    "&:hover": {
      color: "black",
      backgroundColor: "#C7C1D3"
    }
  },
  buttonActiva: {
    color: "white",
    backgroundColor: "#0A8920",
    "&:hover": {
      color: "black",
      backgroundColor: "#C7C1D3"
    }
  },
  buttonEliminar: {
    color: "#FFFFFF",
    backgroundColor: "#DC3545",
    fontWeight: "bold",

    "&:hover": {
      color: "black",
      backgroundColor: "#C7C1D3"
    }
  },

  buttonEditar: {
    color: "#212529",
    backgroundColor: "#FFC107",
    marginRight: "10px",
    fontWeight: "bold",
    "&:hover": {
      color: "black",
      backgroundColor: "#C7C1D3"
    }
  }
};

export const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};
