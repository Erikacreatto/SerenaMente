import { View, Text, StyleSheet } from 'react-native';
export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>SerenaMente</Text>
            <Text style={styles.subtitle}>Movimento	com	calma</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#7a9e7e',
    },
    subtitle: {
        fontSize: 21,
        color: '#9b8ec4',
        marginTop: 6,
    },
});