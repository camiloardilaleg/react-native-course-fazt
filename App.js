import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

const App = () => {

  const defaultImage = 'https://i.pinimg.com/564x/71/2d/2a/712d2ae884ecfc5075691eabaae367b1.jpg';
  const [selectedImage, setSelectedImage] = useState({ uri: defaultImage });

  let openImagePickerAsync = async () => {
    // Solicita los permisos al usuario
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); // return true or fall

    if (permissionResult.granted === false) {
      alert('Permission to access media library is required!');
      return;
    }

    let ImageSelected = await ImagePicker.launchImageLibraryAsync();
    // console.log(ImageSelected);

    if (ImageSelected.cancelled === true) {
      return;
    }
    
    if (Platform.OS === 'web'){
      setSelectedImage({ uri: ImageSelected.uri });
      let remoteUri = await uploadToAnonymousFilesAsync(ImageSelected.uri);
      console.log(remoteUri);
    } else {
      setSelectedImage({ uri: ImageSelected.uri });
    }

  }

  let openShareDialogAsync = async () => {
    // Averigua si es compatible con el dispositivo
    if (!(await Sharing.isAvailableAsync())){
      alert('Tu dispositivo no permite esta funcion');
      return;
    }

    if (selectedImage.uri === defaultImage) {
      alert('No puedes compartir esta imagen, selecciona una de tu dispositivo');
      return;
    }
    
    await Sharing.shareAsync(selectedImage.uri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Selecciona una imagen
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={openShareDialogAsync}
      >
        <Text style={styles.buttonText}>
          Compartir
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'aliceblue' },
    title: { display: 'flex', fontSize: 30, padding: 10, color: '#000000', justifyContent: 'center', alignItems: 'center' },
    image: { display: 'flex', width: 200, height: 200, borderRadius: 100, marginBottom: 20, resizeMode: 'contain' },
    // es mejor estilar el texto de touchableOpacity que el componente en si
    buttonText: { backgroundColor: 'blue', color: '#fff', padding: 10, margin: 10, borderRadius: 5 }
  }
)

export default App


{/* Uso de los botones      
      <Button
        color='#000'
        title='Selecciona una imagen'
        onPress={openImagePickerAsync}
        style={styles.button}
      /> */}