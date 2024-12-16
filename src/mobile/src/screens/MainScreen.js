import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Entypo";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import Header from "./Header"; // Importa o Header
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const MainScreen = () => {
  const [isVisibleNotes, setIsVisibleNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [searchText, setSearchText] = useState(""); // Estado para o texto da pesquisa

  // Função para buscar notas do backend
  const handleGetAll = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const url = `${API_URL}/getAll`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setNotes(responseData);
      } else {
        const errorData = await response.json();
        console.log("Erro ao obter notas:", errorData);
        Alert.alert("Erro", "Erro ao obter notas: " + errorData.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", "Erro na requisição: " + error.message);
    }
  };

  // Use o useEffect para carregar as notas ao iniciar a tela
  useEffect(() => {
    handleGetAll();
  }, []);

  // Função para criar ou editar uma nota
  const handleSaveNote = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Erro", "Token de autenticação não encontrado.");
        return;
      }

      const updatedNote = {};
      if (noteContent.trim() !== "") {
        updatedNote.body = noteContent.trim();
      }
      if (noteTitle.trim() !== "") {
        updatedNote.title = noteTitle.trim();
      }

      const url = `${API_URL}/editNote/${editingNoteId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        const updatedNoteResponse = await response.json();
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === editingNoteId
              ? { ...note, ...updatedNote }
              : note
          )
        );
        Alert.alert(
          'Notas',
          'Alteração na nota feita com sucesso.',
        );
        setIsVisibleNotes(false);
        setNoteTitle("");
        setNoteContent("");
        setIsEditing(false);
        setEditingNoteId(null);
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message || "Erro ao atualizar a nota.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a nota.");
    }
  };

  // Função para editar uma nota
  const handleEditNote = (note) => {
    setIsEditing(true);
    setEditingNoteId(note._id);
    setNoteTitle(note.title);
    setNoteContent(note.body);
    setIsVisibleNotes(true);
  };

  // Função para excluir uma nota
  const handleDeleteNote = async (id) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const url = `${API_URL}/deleteNote/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        Alert.alert(
          'Notas',
          'Sua nota foi removida com sucesso.',
        );
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", "Não foi possível deletar a nota.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar a nota.");
    }
  };

  // Filtra as notas com base no texto de pesquisa
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header onNoteCreated={handleGetAll} />

      <View style={styles.pesquisa}>
        <TextInput
          style={styles.input}
          placeholder="Procurar nota..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText} // Atualiza o texto da pesquisa
        />
      </View>

      <View style={styles.container}>
        {filteredNotes.map((item) => (
          <View key={item._id} style={styles.notasHome}>
            <TouchableOpacity
              style={{ width: "93%" }}
              onPress={() => handleEditNote(item)}
            >
              <Text style={styles.texts}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteNote(item._id)}>
              <Icon name="delete" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Modal animationType="fade" visible={isVisibleNotes} transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setIsVisibleNotes(false)}>
              <Icon name="arrowleft" size={30} color="#ffa31a" />
            </TouchableOpacity>

            <Image
              style={styles.logo}
              source={require("../../assets/img/noteHub.png")}
            />

            <TouchableOpacity onPress={handleSaveNote}>
              <Icon2 name="save" size={30} color="#ffa31a" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalNotes}>
            <TextInput
              style={styles.titleInput}
              value={noteTitle}
              onChangeText={setNoteTitle}
              placeholder="Digite o título..."
              placeholderTextColor="#888"
            />
            <View style={styles.line}></View>

            <TextInput
              style={styles.textNotes}
              multiline={true}
              numberOfLines={10}
              placeholder="Escreva sua nota aqui..."
              placeholderTextColor="#888"
              onChangeText={setNoteContent}
              value={noteContent}
              textAlignVertical="top"
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1b1b",
    borderTopColor: "black",
    flex: 1,
  },
  line: {
    borderTopWidth: 2,
    borderColor: "white",
    top: 10,
    borderRadius: 20,
  },
  logo: {
    flex: 1,
    height: "50%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#1b1b1b",
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#1b1b1b",
  },
  modalNotes: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    paddingHorizontal: 15,
  },
  notasHome: {
    height: 60,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  titleInput: {
    color: "#fff",
    fontSize: 22,
    padding: 7,
  },
  textNotes: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
  },
  pesquisa: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 5,
  },
  input: {
    width: "100%",
    height: 50,
    paddingLeft: 10,
    backgroundColor: "#2c2c2c",
    color: "#fff",
    borderRadius: 8,
  },
  icons: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  texts: {
    fontSize: 18,
    color: "#fff",
    width: "100%",
  },
});

export default MainScreen;
