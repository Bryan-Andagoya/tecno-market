import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { styles } from './style';
import { UserContext } from 'app/context';
import { UserPlusFA5Icon } from 'app/icons';
import { colors } from 'app/styles';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'app/config';
import { updateProfile, User } from 'firebase/auth';

export const DrawerContentComponent = (props: DrawerContentComponentProps) => {
  const { user } = useContext(UserContext);
  const [userPhotoUri, setUserPhotoUri] = useState<string | null>(user?.photoURL || null);

  const uploadUserPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 1,
      });

      if (!result.cancelled) {
        const blob = await new Promise<Blob>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new Error());
          };
          xhr.responseType = 'blob';
          xhr.open('GET', result.uri, true);
          xhr.send(null);
        });

        const storageRef = ref(storage, `images/user-profiles/${user?.uid}.jpg`);

        const { ref: imageRef } = await uploadBytes(storageRef, blob);

        const photoUri = await getDownloadURL(imageRef);

        await updateProfile(user || ({} as User), { photoURL: photoUri });

        setUserPhotoUri(user?.photoURL || null);
      }
    } catch (error) {
      Alert.alert('¡Algo salió mal!', 'Error al cargar la imagen, intentelo más tarde');
      console.log(error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <View style={styles.userIconContainer}>
          <TouchableOpacity onPress={uploadUserPhoto}>
            {userPhotoUri ? (
              <Image style={styles.userImage} source={{ uri: userPhotoUri }} />
            ) : (
              <UserPlusFA5Icon size={24} color={colors.PRIMARY} style={styles.userIcon} />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.userText}>{user?.displayName || user?.email || ''}</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
