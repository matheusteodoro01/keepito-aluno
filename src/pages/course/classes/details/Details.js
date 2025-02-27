import React, { useState, useEffect } from "react";
import {
  Grid,
  CardContent,
  CardActions,
  Modal,
  Box,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { Link, useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import EditIcon from "@material-ui/icons/Edit";

// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "../../../../components/styles";

// components
import SaveQuiz from "../../../../components/quiz/Save";
import CardMedia from "@material-ui/core/CardMedia";
import api from "../../../../services/api";
import { decoder } from "../../../../services/decoder";
import FilesPanel from "../../../../components/FilesPanel";

export default function DetailsClasse(props) {
  var classesNames = useStyles();
  const [classe, setClasse] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [quizSelected, setQuizSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [openFiles, setOpenFiles] = useState(false);
  let { classeId, couseId } = useParams(),
    hiddenFileInput = React.useRef(null),
    uploadFileButton = (event) => {
      hiddenFileInput.current.click();
    },
    uploadFile = (event) => {
      const file = event.target.files[0];
      const sendFile = async () => {
        const dataForm = new FormData();
        dataForm.append("file", file);
        const res = await api.post(
          api.version + "classes/uploadFile?classId=" + classeId,
          dataForm,
        );
      };
      sendFile();
    },
    getFiles = () => {
      async function loadFiles() {
        return await api
          .get(api.version + "classes/files?classId=" + classeId, {})
          .then((response) => {
            return response.data;
          });
      }
      return loadFiles();
    };

  async function getClasse() {
    try {
      const classe = await api.get(`/v1/classes/${classeId}`);
      setClasse(classe.data);
      setQuizzes(classe.data.quizzes);
    } catch (error) {
      setClasse([]);
      setQuizzes([]);
    }
  }

  useEffect(() => {
    getClasse();
  }, []);

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box className={classesNames.boxModalCreateQuizForm}>
          <SaveQuiz
            classId={classeId}
            quizzes={quizzes}
            quizSelected={quizSelected}
            setQuizzes={setQuizzes}
            setShowModal={setShowModal}
          />
        </Box>
      </Modal>
      <Grid container spacing={1}>
        <Grid item sm={4} md={4}>
          <Card
            style={{
              boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
              backgroundColor: "#fafafa",
            }}
          >
            <CardMedia
              component="img"
              maxWidth="345"
              maxHeight="345"
              image="https://escuelafullstack.com/web/image/slide.channel/18/image_512"
              alt="green iguana"
            />
          </Card>
        </Grid>

        <Grid item sm={8} md={8}>
          <CardContent>
            <Typography gutterBottom variant="h1" component="div">
              {classe.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {classe.description}
            </Typography>

            <CardActions>
              <Typography gutterBottom variant="h1" component="div">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    setQuizSelected(null);
                    setShowModal(true);
                  }}
                >
                  Criar Quiz
                </Button>
              </Typography>

              <div>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={uploadFile}
                  accept="application/pdf"
                  style={{ display: "none" }}
                />
                <Typography gutterBottom variant="h1" component="div">
                  <Button
                    onClick={uploadFileButton}
                    variant="outlined"
                    color="primary"
                    size="large"
                    endIcon={<AttachFileIcon />}
                  >
                    Enviar Arquivo
                  </Button>
                </Typography>
              </div>
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={15} md={12} lg={12}>
          <Typography gutterBottom variant="h2" component="div">
            Conteudo
          </Typography>
        </Grid>
        {quizzes.map((quiz) => (
          <Grid item sm={12} md={12} lg={12} key={quiz.id}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="p">
                  {quiz.name}
                </Typography>
                <Typography>{quiz.description}</Typography>
                <Typography>{quiz.questions.length} Questões</Typography>
                <Stack direction="row" alignItems={"flex-end"} width="100%">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={Link}
                    to={`/app/course/classe/quiz/details/${quiz.id}`}
                  >
                    Acessar
                  </Button>
                  <Stack
                    direction="column"
                    alignItems={"flex-end"}
                    width="100%"
                  >
                    <IconButton
                      size="small"
                      onClick={() => {
                        setQuizSelected(quiz);
                        setShowModal(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
