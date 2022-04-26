import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    boxModalCourseForm: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
        background: '#FFFFFF',
        'border-radius': '25px',
        padding: 5
    },
    boxModalClassesForm: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        background: '#FFFFFF',
        'border-radius': '25px',
        padding: 5
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(4),

        '& .MuiTextField-root': {
            margin: theme.spacing(4),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
        '& .MuiGrid-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

