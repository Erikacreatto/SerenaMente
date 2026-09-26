import { useState } from 'react';
import { Image, View, Text, Pressable, ScrollView, StyleSheet, } from 'react-native';
import Header from '../components/Header';
import Modalidade from '../components/Modalidade';
import frases from '../data/frases';



export default function Home({ navigation }: any) {
	const [idFrase, setIdFrase] = useState(1);
	function proximaFrase() {
		setIdFrase(
			idFrase === frases.length
				? 1
				: idFrase + 1
		);
	}
	return (
		<ScrollView
			style={styles.scroll}
			contentContainerStyle={styles.container}
		>
			<View style={styles.logoContainer}>
				<Image
				source={require('../assets/logo.png')}
				style = {styles.logo}
					/>
			</View>

			<Header />

			<View style={styles.intro}>
				<Text style={styles.description}>
					
				</Text>
			</View>
		
			<View style={styles.fraseBox}>
				<Text style={styles.fraseTitulo}>Frase	do	dia</Text>
				{frases
					.filter(frase => frase.id === idFrase)
					.map(frase => (
						<Text key={frase.id} style={styles.fraseTexto}>
							{frase.texto}
						</Text>
					))}
				<Pressable onPress={proximaFrase}>
					<Text style={styles.fraseBotao}>Próxima</Text>
				</Pressable>
			</View>
			<Modalidade
				icone=" "
				nome="Yoga"
				descricao="Posturas,	respiração	e	relaxamento"
				cor="#81a385"
				onPress={() =>
					navigation.navigate('Categoria', { modalidade: 'Yoga' })
				}
			/>
			<Modalidade
				icone=" "
				nome="Meditação"
				descricao="Foco,	corpo	e	estados	mentais"
				cor="#9083c0"
				onPress={() =>
					navigation.navigate('Categoria', { modalidade: 'Meditação' })
				}
			/>
			<Pressable
				style={styles.buttonSessao}
				onPress={() => navigation.navigate('MinhaSessao')}
			>
				<Text style={styles.buttonSessaoText}>
					Minha	sessão
				</Text>
			</Pressable>
			<Pressable
				style={styles.buttonGerenciar}
				onPress={() => navigation.navigate('Praticas')}
			>
				<Text style={styles.buttonGerenciarText}>
					Gerenciar	práticas
				</Text>
			</Pressable>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	scroll: {
		flex: 1,
		backgroundColor: '#f0edf4',
	},
	container: {
		flexGrow: 1,
		justifyContent: 'center',
		padding: 20,
	},
	logoContainer: {
    width: '100%',
    height: 117,
    justifyContent: 'center',
    alignItems: 'center',
	marginTop: -15,
	},
	logo: {
		width: '100%',
		height: '110%',
		resizeMode: 'cover'
	},
	intro: {
		alignItems: 'center',
		marginBottom: 10,
	},
	description: {
		fontSize: 22,
		color: '#7928a1',
		paddingBottom: 20,
	},
	fraseBox: {
		backgroundColor: '#ffffff',
		padding: 5,
		borderRadius: 12,
		alignItems: 'center',
		marginBottom: 8,
	},
	fraseTitulo: {
		fontSize: 14,
		color: '#979594',
	},
	fraseTexto: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#826590',
		marginTop: 6,
	},
	fraseBotao: {
		fontSize: 13,
		fontWeight: 'bold',
		color: '#979594',
		marginTop: 10,
	},
	buttonSessao: {
		backgroundColor: '#826590',
		paddingVertical: 15,
		borderRadius: 12,
		alignItems: 'center',
		marginTop: 20,
	},
	buttonSessaoText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	buttonGerenciar: {
		borderWidth: 1.5,
		borderColor: '#7a9e7e',
		paddingVertical: 13,
		borderRadius: 12,
		alignItems: 'center',
		marginTop: 12,
	},
	buttonGerenciarText: {
		color: '#5f8563',
		fontSize: 15,
		fontWeight: 'bold',
	},
});