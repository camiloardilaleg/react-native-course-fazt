import { Text, View, StyleSheet, Image, Button } from 'react-native';

export const ImageComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Hola, soy Maria, y soy así de hermosa
            </Text>
            <Image
                source={{ uri: 'https://i.pinimg.com/564x/71/2d/2a/712d2ae884ecfc5075691eabaae367b1.jpg' }}
                style={styles.image}
            />
        </View>
    )
}


const styles = StyleSheet.create(
    {
        container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'aliceblue' },
        title: { display: 'flex', fontSize: 30, padding: 10, color: '#000000', justifyContent: 'center', alignItems: 'center' },
        image: { width: 200, height: 200, borderRadius: 100 }
    }
)

export default ImageComponent;
