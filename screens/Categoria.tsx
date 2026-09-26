import { View, Text, Image, ScrollView, StyleSheet, } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import PraticaCard from '../components/PraticaCard';
import type { Pratica } from '../components/PraticaCard';
import imagens from '../data/imagens'

export default function Categoria(props: any) {
	const db = useSQLiteContext();
	//	Modalidade	recebida	pela	navegação
	const modalidade = props.route.params.modalidade;
	const [praticas, setPraticas] = useState<Pratica[]>([]);
	useEffect(() => {
		carregarPraticas();
	}, []);
	//	SELECT	só	da	modalidade	recebida
	async function carregarPraticas() {
		const resultado = await db.getAllAsync(
			`
						SELECT	*
						FROM	praticas
						WHERE	modalidade	=	?
						ORDER	BY	id
						`,
			modalidade
		) as Pratica[];
		console.log('MODALIDADE:', modalidade);
    
		setPraticas(resultado);
		
	}
	//	Banner	e	cor	mudam	conforme	a	modalidade
	const banner =
		modalidade === 'Yoga'
			? imagens.banner_yoga
			: imagens.banner_meditacao;
	const cor =
		modalidade === 'Yoga'
			? '#7a9e7e'
			: '#7466a8';
	//	Lista	das	subcategorias	que	existem	nessa	modalidade
	const subcategorias =
    modalidade === 'Yoga'
        ? ['Posturas (Asanas)', 'Respiração (Pranayamas)', 'Foco e Relaxamento']
        : ['Ancoragem e Foco', 'Varredura Corporal', 'Cultivo de Estados Mentais'];
	return (
		<ScrollView style={styles.scroll}>
			<View style={styles.bannerBox}>
				<Image source={banner} style={styles.banner} />
				<View style={[styles.faixa, { backgroundColor: cor }]}>
					<Text style={styles.bannerTitulo}>{modalidade}</Text>
					<Text style={styles.bannerTexto}>
						{praticas.length}	práticas
					</Text>
				</View>
			</View>
			<View style={styles.conteudo}>
				{subcategorias.map(subcategoria => (
					<View key={subcategoria} style={styles.secao}>
						<Text style={styles.secaoTitulo}>
							{subcategoria}
						</Text>
						{praticas
							.filter(pratica => pratica.subcategoria === subcategoria)
							.map(pratica => (
								<PraticaCard key={pratica.id}
									pratica={pratica}
									onAbrir={(id) =>
										props.navigation.navigate('Detalhes', { id: id })
									}
								/>
							))}
					</View>
				))}
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	scroll: {
		flex: 1,
		backgroundColor: '#f0edf4',
	},
	bannerBox: {
		marginBottom: 8,
	},
	banner: {
		width: '100%',
		height: 180,
	},
	faixa: {
		padding: 16,
	},
	bannerTitulo: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#ffffff',
	},
	bannerTexto: {
		fontSize: 14,
		color: '#ffffff',
		marginTop: 2,
	},
	conteudo: {
		padding: 20,
	},
	secao: {
		marginBottom: 20,
	},
	secaoTitulo: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#3d3935',
		marginBottom: 10,
	},
});