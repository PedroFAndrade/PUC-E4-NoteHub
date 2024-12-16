import React, { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  Text,
  Alert,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export default function Header({ onNoteCreated }) {
  const [isVisible, setIsVisible] = useState(false);
  const [listas, setListas] = useState([]);

  const criarNota = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");

      if (!userToken) {
        console.error("Token de autenticação ausente");
        return;
      }

      const novaNota = {
        title: "Título Padrão",
        type: "text",
        body: "",
      };

      console.log("Dados enviados para a API:", novaNota);

      const response = await fetch(`${API_URL}/createNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify(novaNota),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Erro ao criar nota: ${response.status} - ${errorData}`);
      }

      Alert.alert(
        'Notas',
        'Nota criada com sucesso.',
      );

      // Fecha o modal
      setIsVisible(false);

      // Chama a função para atualizar a lista de notas
      if (onNoteCreated) {
        onNoteCreated(); // Atualiza a lista de notas no MainScreen
      }
    } catch (error) {
      console.error("Erro ao criar nota:", error);
    }
  };

  const criarLista = async () => {
    try {
      const novaLista = {
        titulo: `Lista ${listas.length + 1}`,
        itens: [], // Inclua mais campos, se necessário
      };

      const response = await fetch(`${API_URL}/listas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaLista),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar lista: ${response.status}`);
      }

      const data = await response.json();
      setListas([...listas, data]); // Atualiza o estado local com a resposta da API
      setIsVisible(false);
      console.log("Lista criada:", data);
    } catch (error) {
      console.error("Erro ao criar lista:", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            paddingTop: 10,
            width: 50, // Largura do botão
            height: 50, // Altura do botão
            justifyContent: "center", // Centraliza verticalmente
            alignItems: "center", // Centraliza horizontalmente
          }}
          onPress={criarNota}
        >
          <Image
            style={styles.plus}
            source={require("../../assets/img/plus_or.png")}
          />
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={require("../../assets/img/noteHub.png")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1b1b1b",
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  logo: {
    flex: 1,
    height: "50%",
    resizeMode: "contain",
    alignSelf: "center",
    right: 16,
    top: "13%",
  },
  plus: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    alignSelf: "center",
    top: "13%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  modal: {
    position: "absolute",
    top: 50,
    left: 40,
    width: 170,
    height: 115,
    backgroundColor: "#292929",
    borderRadius: 5,
    padding: 10,
  },
  btnModal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 10,
  },
  modalText: {
    color: "#fff",
    fontSize: 20,
  },
});
