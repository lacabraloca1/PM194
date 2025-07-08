import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  SectionList,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import {
  ActivityIndicator,
  Card,
  Text,
  Snackbar,
  Appbar,
  Chip,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";

// Imagen decorativa para el encabezado
const HEADER_IMG =
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1000&q=80";

const CATEGORIAS = [
  { nombre: "Ficción", query: "subject:fiction" },
  { nombre: "Historia", query: "subject:history" },
  { nombre: "Tecnología", query: "subject:technology" },
];

const temaClaro = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3E64FF",
    background: "#fafafa",
    surface: "#ffffff",
    text: "#222222",
  },
};

export default function App() {
  return (
    <PaperProvider theme={temaClaro}>
      <SafeAreaView style={styles.container}>
        <MainApp />
      </SafeAreaView>
    </PaperProvider>
  );
}

function MainApp() {
  const [categoriaActiva, setCategoriaActiva] = useState(CATEGORIAS[0]);
  const [secciones, setSecciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const fetchLibros = async () => {
    setLoading(true);
    setSecciones([]);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${categoriaActiva.query}&maxResults=30`
      );
      const data = await res.json();
      if (!data.items) throw new Error("No se encontraron resultados.");

      const librosPorAutor = {};

      data.items.forEach((item) => {
        const info = item.volumeInfo;
        const autor = info.authors?.[0] || "Autor desconocido";

        if (!librosPorAutor[autor]) {
          librosPorAutor[autor] = [];
        }

        librosPorAutor[autor].push({
          id: item.id,
          titulo: info.title || "Sin título",
          descripcion: info.description || "Sin descripción disponible.",
          editorial: info.publisher || "Editorial desconocida",
          imagen:
            info.imageLinks?.thumbnail ||
            "https://via.placeholder.com/100x150.png?text=No+Image",
        });
      });

      const seccionesFormateadas = Object.entries(librosPorAutor).map(
        ([autor, libros]) => ({
          title: autor,
          data: libros,
        })
      );

      if (seccionesFormateadas.length === 0)
        throw new Error("No hay libros para mostrar.");

      setSecciones(seccionesFormateadas);
    } catch (error) {
      setErrorMsg(error.message);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, [categoriaActiva]);

  const renderLibro = ({ item }) => (
    <Card style={styles.card} elevation={3}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View style={styles.textoContainer}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.editorial}>{item.editorial}</Text>
          <ScrollView style={styles.descripcionScroll}>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          </ScrollView>
        </View>
      </View>
    </Card>
  );

  return (
    <>
      <Appbar.Header elevated>
        <Appbar.Content title="Explora Libros por Categoría" />
      </Appbar.Header>

      {/* Imagen de encabezado decorativa */}
      <Image source={{ uri: HEADER_IMG }} style={styles.encabezadoImg} />

      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <Chip
            key={cat.nombre}
            selected={categoriaActiva.nombre === cat.nombre}
            onPress={() => setCategoriaActiva(cat)}
            style={styles.chip}
          >
            {cat.nombre}
          </Chip>
        ))}
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator animating={true} size="large" />
          <Text style={{ marginTop: 8 }}>Cargando libros...</Text>
        </View>
      ) : (
        <SectionList
          sections={secciones}
          keyExtractor={(item) => item.id}
          renderItem={renderLibro}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.autor}>{title}</Text>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.vacio}>No hay libros disponibles.</Text>
          )}
          contentContainerStyle={styles.lista}
        />
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Reintentar",
          onPress: fetchLibros,
        }}
      >
        {errorMsg}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  encabezadoImg: {
    width: Dimensions.get("window").width,
    height: 160,
    resizeMode: "cover",
  },
  categorias: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  chip: {
    margin: 4,
  },
  autor: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#eaeaea",
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 12,
    borderRadius: 6,
    color: "#333",
  },
  lista: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  card: {
    marginVertical: 6,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  cardContent: {
    flexDirection: "row",
    padding: 10,
  },
  imagen: {
    width: 90,
    height: 130,
    borderRadius: 6,
    marginRight: 12,
  },
  textoContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
    color: "#222",
  },
  editorial: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 6,
  },
  descripcionScroll: {
    maxHeight: 80,
  },
  descripcion: {
    fontSize: 14,
    color: "#444",
  },
  centered: {
    marginTop: 60,
    alignItems: "center",
  },
  vacio: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
});
