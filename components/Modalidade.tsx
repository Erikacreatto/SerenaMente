import { View, Text, Pressable, StyleSheet } from 'react-native';
type ModalidadeProps = {
    icone: string;
    nome: string;
    descricao: string;
    cor: string;
    onPress: () => void;
};
export default function Modalidade(props: ModalidadeProps) {
    return (
        <Pressable
            style={[styles.card, { backgroundColor: props.cor }]}
            onPress={props.onPress}
        >
            <Text style={styles.icone}>{props.icone}</Text>
            <View style={styles.textos}>
                <Text style={styles.nome}>{props.nome}</Text>
                <Text style={styles.descricao}>{props.descricao}</Text>
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    icone: {
        fontSize: 30,
        marginRight: 14,
    },
    textos: {
        flex: 1,
    },
    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    descricao: {
        fontSize: 16,
        color: '#ffffff',
        marginTop: 3,
    },
});