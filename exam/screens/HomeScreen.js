import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  SectionList,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import debounce from "lodash.debounce";
import {
  ActivityIndicator,
  Text,
  Appbar,
  Chip,
  Snackbar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BookCard from "../components/BookCard";
import ConnectionBanner from "../components/ConnectionBanner";

const CATEGORIAS = [
  { nombre: "Ficción", query: "subject:fiction" },
  { nombre: "Historia", query: "subject:history" },
  { nombre: "Tecnología", query: "subject:technology" },
  { nombre: "Arte", query: "subject:art" },
  { nombre: "Negocios", query: "subject:business" },
  { nombre: "Ciencia", query: "subject:science" },
  { nombre: "Matemáticas", query: "subject:mathematics" },
  { nombre: "Viajes", query: "subject:travel" },
];

export default function HomeScreen() {
  const [categoriaActiva, setCategoriaActiva] = useState(CATEGORIAS[0]);
  const [secciones, setSecciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchText, setSearchText] = useState("");
  const [ordenDesc, setOrdenDesc] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchLibros();
  }, [categoriaActiva, ordenDesc]);

  const fetchLibros = async () => {
    setLoading(true);
    setSecciones([]);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${categoriaActiva.query}&maxResults=40`
      );
      const data = await res.json();
      if (!data.items) throw new Error("No se encontraron resultados.");

      const librosPorAutor = {};

      data.items.forEach((item) => {
        const info = item.volumeInfo;
        const autor = info.authors?.[0] || "Autor desconocido";
        const fecha = info.publishedDate || "0000";

        const libro = {
          id: item.id,
          titulo: info.title || "Sin título",
          descripcion: info.description || "Sin descripción disponible.",
          editorial: info.publisher || "Editorial desconocida",
          imagen:
            info.imageLinks?.thumbnail ||
            "https://via.placeholder.com/100x150.png?text=No+Image",
          fecha,
          autor,
        };

        if (!librosPorAutor[autor]) {
          librosPorAutor[autor] = [];
        }
        librosPorAutor[autor].push(libro);
      });

      let seccionesFormateadas = Object.entries(librosPorAutor)
        .filter(([_, libros]) => libros.length >= 2)
        .map(([autor, libros]) => ({
          title: autor,
          data: libros.sort((a, b) => {
            if (ordenDesc) return b.fecha.localeCompare(a.fecha);
            return a.fecha.localeCompare(b.fecha);
          }),
        }));

      if (seccionesFormateadas.length === 0)
        throw new Error("No hay libros para mostrar.");

      setSecciones(seccionesFormateadas);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const manejarBusqueda = useCallback(
    debounce((texto) => {
      setSearchText(texto);
    }, 500),
    []
  );

  const toggleOrden = () => setOrdenDesc((prev) => !prev);

  const resultadosFiltrados = secciones
    .map((sec) => ({
      title: sec.title,
      data: sec.data.filter(
        (libro) =>
          libro.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
          libro.autor.toLowerCase().includes(searchText.toLowerCase())
      ),
    }))
    .filter((sec) => sec.data.length > 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <Appbar.Header>
        <Appbar.Content title="Catálogo de Libros" />
        <Appbar.Action icon={ordenDesc ? "arrow-down" : "arrow-up"} onPress={toggleOrden} />
      </Appbar.Header>

      <ConnectionBanner connected={isConnected} />

      <Image
        source={{ uri: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4" }}
        style={{ width: Dimensions.get("window").width, height: 160 }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView style={styles.contenedorBusqueda}>
          <TextInput
            placeholder="Buscar por título o autor..."
            onChangeText={manejarBusqueda}
            style={styles.buscador}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriasContenedor}>
            {CATEGORIAS.map((cat) => (
              <Chip
                key={cat.nombre}
                selected={categoriaActiva.nombre === cat.nombre}
                onPress={() => setCategoriaActiva(cat)}
                style={[
                  styles.chip,
                  categoriaActiva.nombre === cat.nombre && styles.chipActivo,
                ]}
                textStyle={{ color: categoriaActiva.nombre === cat.nombre ? "#fff" : "#333" }}
              >
                {cat.nombre}
              </Chip>
            ))}
          </ScrollView>
        </ScrollView>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} size="large" />
        ) : (
          <SectionList
            sections={resultadosFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BookCard item={item} onPress={() => navigation.navigate("Detalle", { libro: item })} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
            contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 12 }}
          />
        )}

        <Snackbar
          visible={!!errorMsg}
          onDismiss={() => setErrorMsg("")}
          duration={4000}
        >
          {errorMsg}
        </Snackbar>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorBusqueda: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#fafafa",
  },
  categoriasContenedor: {
    marginVertical: 10,
  },
  buscador: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  chip: {
    marginRight: 10,
    backgroundColor: "#f0f0f0",
  },
  chipActivo: {
    backgroundColor: "#3E64FF",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#eaeaea",
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 12,
    borderRadius: 6,
    color: "#333",
  },
});