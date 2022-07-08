import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Condiciones de Uso aplicación.
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Condiciones de Uso"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <p>El contenido de este sitio web está sujeto a las condiciones aquí expuestas. Los usuarios al acceder, navegar o usar este sitio, reconocen que han leído, entendido y se obligan a cumplir con estos términos, leyes y reglamentos. Si el usuario no está de acuerdo con los presentes términos, le sugerimos abstenerse de utilizar este sitio web.</p> 
            <br></br>
<p>La utilización del sitio web se realiza bajo las siguientes condiciones y advertencias: (1) los datos que se muestran en el sitio web han sido preparados sólo con fines de referencia; (2) los datos consisten o se basan en estimaciones o suposiciones hechas sobre la base de los mejores esfuerzos, basados en las expectativas de las condiciones actuales y futuras en el momento en que fueron desarrollados;  (3) estos datos fueron preparados con la información disponible en el momento de su desarrollo y están sujetos a cambios sin previo aviso; (4) el usuario se compromete a referenciar este sitio web en cualquier publicación que resulte de su uso. </p>
<br></br>
<p>Los conjuntos de datos del sitio web fueron proporcionados por el National Renewable Energy Laboratory (NREL), y por el Coordinated Regional Climate Downscaling Experiment (CORDEX). Invitamos al usuario a visitar los sitios web de las entidades en mención para mayor información acerca de la base de datos.</p> 
<br></br>
          <b>Descargo de responsabilidad</b>
          <br></br>
          <p>El usuario entiende que los creadores de la página web no están obligados a proporcionar al usuario ningún tipo de apoyo, consultoría, formación o asistencia con respecto al uso de los datos y del sitio web o a proporcionar al usuario cualquier actualización, revisión o nueva versión de los mismos. Los creadores de la página web no garantizan ni avalan ningún resultado generado por el uso de los datos, y el usuario es totalmente responsable de los resultados y de cualquier confianza en los resultados. </p>
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            De acuerdo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}