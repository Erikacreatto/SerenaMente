import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import imagens from '../data/imagens';

//	Define	o	tipo	da	prática
export type Pratica = {
    id: number;
    nome: string;
    modalidade: string;
    subcategoria: string;
    nivel: string;
    duracao: number;
    descricao: string;
    passos: string;
    imagem: string;
};

type PraticaCardProps = {
    pratica: Pratica;
    onExcluir?: (id: number) => void;
    onEditar?: (id: number) => void;
    onAbrir?: (id: number) => void;
};

export default function PraticaCard({ pratica, onExcluir, onEditar, onAbrir }: PraticaCardProps) {
    return (
        <View style={styles.card}>
            {imagens[pratica.imagem]
                ? <Image
                    source={imagens[pratica.imagem]}
                    style={styles.foto}
                />
                : <View style={styles.semFoto} />
            }
            <View style={styles.textos}>
                <Text style={styles.nome}>
                    {pratica.nome}
                </Text>
                <Text style={styles.info}>
                    {pratica.subcategoria}	·	{pratica.nivel}	·	{pratica.duracao}	min
                </Text>
                {onAbrir && (
                    <Pressable onPress={() => onAbrir(pratica.id)}>
                        <Text style={styles.textoAbrir}>Ver	detalhes</Text>
                    </Pressable>
                )}
                <View style={styles.acoes}>
                    {onEditar && (
                        <Pressable onPress={() => onEditar(pratica.id)}>
                            <Text style={styles.textoEditar}>Editar</Text>
                        </Pressable>
                    )}
                    {onExcluir && (
                        <Pressable onPress={() => onExcluir(pratica.id)}>
                            <Text style={styles.textoExcluir}>Excluir</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    foto: {
        width: 64,
        height: 64,
        borderRadius: 10,
        marginRight: 12,
    },
    semFoto: {
        width: 64,
        height: 64,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: '#e3ebe3',
    },
    textos: {
        flex: 1,
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7a9e7e',
        marginBottom: 4,
    },
    info: {
        fontSize: 13,
        color: '#6b6560',
    },
    textoAbrir: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#7466a8',
        marginTop: 6,
    },
    acoes: {
        flexDirection: 'row',
        marginTop: 8,
    },
    textoEditar: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#5f8563',
        marginRight: 18,
    },
    textoExcluir: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#a0524a',
    },
});