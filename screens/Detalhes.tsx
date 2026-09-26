import {
	View,
	Text,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import type { Pratica } from '../components/PraticaCard';
import imagens from '../data/imagens';
export default function Detalhes(props: any) {
	const db = useSQLiteContext();
	//	ID	recebido	através	da	navegação
	const id = props.route.params.id;
	const [pratica, setPratica] = useState<Pratica | null>(null);
	const [carregando, setCarregando] = useState(true);
	useEffect(() => {
		carregarPratica();
	}, []);
	//	Busca	uma	única	prática
	async function carregarPratica() {
		const resultado = await db.getFirstAsync(
			`
						SELECT	*
						FROM	praticas
						WHERE	id	=	?
						`,
			id
		) as Pratica;
		setPratica(resultado);
		setCarregando(false);
	}
	//	Adiciona	a	prática	à	sessão
	async function adicionarSessao() {
		if (!pratica) {
			return;
		}
		await db.runAsync(
			`
						INSERT	INTO	sessao
						(nome,	duracao,	concluida)
						VALUES	(?,	?,	?)
						`,
			pratica.nome,
			pratica.duracao,
			0
		);
		Alert.alert(
			'Pronto',
			'Prática	adicionada	à	sua	sessão!'
		);
	}
	if (carregando) {
		return (
			<View style={styles.centro}>
				<ActivityIndicator size="large" color="#7a9e7e" />
			</View>
		);
	}
	if (!pratica) {
		return (
			<View style={styles.centro}>
				<Text style={styles.aviso}>Prática	não	encontrada.</Text>
			</View>
		);
	}
	return (
		<ScrollView style={styles.scroll}>
			{imagens[pratica.imagem]
				? <Image
					source={imagens[pratica.imagem]}
					style={styles.foto}
				/>
				: <View style={styles.semFoto} />
			}
			<View style={styles.conteudo}>
				<Text style={styles.nome}>{pratica.nome}</Text>
				<View style={styles.tags}>
					<Text style={styles.tag}>{pratica.modalidade}</Text>
					<Text style={styles.tag}>{pratica.subcategoria}</Text>
					<Text style={styles.tag}>{pratica.nivel}</Text>
					<Text style={styles.tag}>{pratica.duracao}	min</Text>
				</View>
				<Text style={styles.descricao}>{pratica.descricao}</Text>
				{pratica.passos
					? <View style={styles.passosBox}>
						<Text style={styles.passosTitulo}>Como	fazer</Text>
						{pratica.passos
							.split('\n')
							.map((passo, indice) => (
								<Text key={indice} style={styles.passosTexto}>
									{passo}
								</Text>
							))}
					</View>
					: null
				}
				<Pressable
					style={styles.button}
					onPress={adicionarSessao}
				>
					<Text style={styles.buttonText}>
						Adicionar	à	sessão
					</Text>
				</Pressable>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	scroll: {
		flex: 1,
		backgroundColor: '#f0edf4',
	},
	centro: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f5f0e8',
	},
	aviso: {
		fontSize: 16,
		color: '#6b6560',
	},
	foto: {
		width: '100%',
		height: 240,
	},
	semFoto: {
		width: '100%',
		height: 240,
		backgroundColor: '#e3ebe3',
	},
	conteudo: {
		padding: 20,
	},
	nome: {
		fontSize: 26,
		fontWeight: 'bold',
		color: '#5f8563',
		marginBottom: 12,
	},
	tags: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 16,
	},
	tag: {
		backgroundColor: '#ece9f5',
		color: '#5a4f8a',
		fontSize: 13,
		fontWeight: 'bold',
		borderRadius: 20,
		paddingVertical: 6,
		paddingHorizontal: 12,
		marginRight: 8,
		marginBottom: 8,
		overflow: 'hidden',
	},
	descricao: {
		fontSize: 16,
		color: '#4a4541',
		lineHeight: 24,
		marginBottom: 20,
	},
	passosBox: {
		backgroundColor: '#ffffff',
		borderRadius: 12,
		padding: 16,
	},
	passosTitulo: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#3d3935',
		marginBottom: 10,
	},
	passosTexto: {
		fontSize: 17,
		color: '#4a4541',
		lineHeight: 26,
		marginBottom: 14,
	},
	button: {
		backgroundColor: '#7a9e7e',
		padding: 16,
		borderRadius: 12,
		alignItems: 'center',
		marginTop: 20,
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});