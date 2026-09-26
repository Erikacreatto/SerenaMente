import	{
		View,
		Text,
		TextInput,
		Pressable,
		ScrollView,
		StyleSheet,
		Alert,
		ActivityIndicator,
}	from	'react-native';
import	{	useEffect,	useState	}	from	'react';
import	{	useSQLiteContext	}	from	'expo-sqlite';
import	type	{	Pratica	}	from	'../components/PraticaCard';
export	default	function	EditarPratica(props:	any)	{
		const	db	=	useSQLiteContext();
		//	ID	recebido	através	da	navegação
		const	id	=	props.route.params.id;
		const	[nome,	setNome]	=	useState('');
		const	[duracao,	setDuracao]	=	useState('');
		const	[descricao,	setDescricao]	=	useState('');
		const	[passos,	setPassos]	=	useState('');
		const	[modalidade,	setModalidade]	=	useState('Yoga');
		const	[subcategoria,	setSubcategoria]	=	useState('Posturas	(Asanas)');
		const	[nivel,	setNivel]	=	useState('Iniciante');
		const	[carregando,	setCarregando]	=	useState(true);
		const	subcategorias	=
				modalidade	===	'Yoga'
						?	['Posturas	(Asanas)',	'Respiração	(Pranayamas)',	'Foco	e	Relaxamento']
						:	['Ancoragem	e	Foco',	'Varredura	Corporal',	'Cultivo	de	Estados	Mentais'];
		function	escolherModalidade(nova:	string)	{
				setModalidade(nova);
				setSubcategoria(
						nova	===	'Yoga'
								?	'Posturas	(Asanas)'
								:	'Ancoragem	e	Foco'
				);
		}
		//	Carrega	a	prática	quando	a	tela	abrir
		useEffect(()	=>	{
				carregarPratica();
		},	[]);
		//	BUSCAR	A	PRÁTICA
		async	function	carregarPratica()	{
				const	pratica	=	await	db.getFirstAsync(
						`
						SELECT	*
						FROM	praticas
						WHERE	id	=	?
						`,
						id
				)	as	Pratica;
				if	(pratica)	{
						setNome(pratica.nome);
						setDuracao(pratica.duracao.toString());
						setDescricao(pratica.descricao);
						setPassos(pratica.passos);
						setModalidade(pratica.modalidade);
						setSubcategoria(pratica.subcategoria);
						setNivel(pratica.nivel);
				}	else	{
						Alert.alert(
								'Erro',
								'Prática	não	encontrada.'
						);
						props.navigation.goBack();
				}
				setCarregando(false);
		}
		//	ATUALIZAR	A	PRÁTICA
		async	function	atualizarPratica()	{
				if	(!nome.trim())	{
						Alert.alert(
								'Atenção',
								'Informe	o	nome	da	prática.'
						);
						return;
				}
				if	(!duracao	||	Number(duracao)	<=	0)	{
						Alert.alert(
								'Atenção',
								'Informe	uma	duração	válida.'
						);
						return;
				}
				await	db.runAsync(
						`
						UPDATE	praticas
						SET
								nome	=	?,
								modalidade	=	?,
								subcategoria	=	?,
								nivel	=	?,
								duracao	=	?,
								descricao	=	?,
								passos	=	?
						WHERE	id	=	?
						`,
						nome.trim(),
						modalidade,
						subcategoria,
						nivel,
						Number(duracao),
						descricao.trim(),
						passos.trim(),
						id
				);
				Alert.alert(
						'Sucesso',
						'Prática	atualizada!',
						[
								{
										text:	'OK',
										onPress:	()	=>
												props.navigation.goBack(),
								},
						]
				);
		}
		//	TELA	DE	CARREGAMENTO
		if	(carregando)	{
				return	(
						<View	style={styles.carregando}>
								<ActivityIndicator	size="large"	color="#7a9e7e"	/>
								<Text	style={styles.carregandoTexto}>
										Carregando	prática...
								</Text>
						</View>
				);
		}
		return	(
				<ScrollView
						style={styles.scroll}
						contentContainerStyle={styles.container}
				>
						<Text	style={styles.label}>Nome</Text>
						<TextInput
								style={styles.input}
								placeholder="Digite	o	nome"
								value={nome}
								onChangeText={setNome}
						/>
						<Text	style={styles.label}>Modalidade</Text>
						<View	style={styles.linha}>
								{['Yoga',	'Meditação'].map(item	=>	(
										<Pressable
												key={item}
												style={
														modalidade	===	item
																?	styles.pillAtiva
																:	styles.pill
												}
												onPress={()	=>	escolherModalidade(item)}
										>
												<Text
														style={
																modalidade	===	item
																		?	styles.pillTextoAtivo
																		:	styles.pillTexto
														}
												>
														{item}
												</Text>
										</Pressable>
								))}
						</View>
						<Text	style={styles.label}>Subcategoria</Text>
						<View	style={styles.linha}>
								{subcategorias.map(item	=>	(
										<Pressable
												key={item}
												style={
														subcategoria	===	item
																?	styles.pillAtiva
																:	styles.pill
												}
												onPress={()	=>	setSubcategoria(item)}
										>
												<Text
														style={
																subcategoria	===	item
																		?	styles.pillTextoAtivo
																		:	styles.pillTexto
														}
												>
														{item}
												</Text>
										</Pressable>
								))}
						</View>
						<Text	style={styles.label}>Nível</Text>
						<View	style={styles.linha}>
								{['Iniciante',	'Intermediário'].map(item	=>	(
										<Pressable
												key={item}
												style={
														nivel	===	item
																?	styles.pillAtiva
																:	styles.pill
												}
												onPress={()	=>	setNivel(item)}
										>
												<Text
														style={
																nivel	===	item
																		?	styles.pillTextoAtivo
																		:	styles.pillTexto
														}
												>
														{item}
												</Text>
										</Pressable>
								))}
						</View>
						<Text	style={styles.label}>Duração	(minutos)</Text>
						<TextInput
								style={styles.input}
								placeholder="Ex.:	10"
								keyboardType="decimal-pad"
								value={duracao}
								onChangeText={setDuracao}
						/>
						<Text	style={styles.label}>Descrição</Text>
						<TextInput
								style={styles.input}
								placeholder="Digite	a	descrição"
								value={descricao}
								onChangeText={setDescricao}
						/>
						<Text	style={styles.label}>Passo	a	passo</Text>
						<TextInput
								style={[styles.input,	styles.inputGrande]}
								placeholder="1.	Primeiro	passo"
								value={passos}
								onChangeText={setPassos}
								multiline
						/>
						<Pressable	style={styles.button}	onPress={atualizarPratica}>
								<Text	style={styles.buttonText}>Salvar	alterações</Text>
						</Pressable>
						<Pressable
								style={styles.cancelar}
								onPress={()	=>	props.navigation.goBack()}
						>
								<Text	style={styles.cancelarTexto}>Cancelar</Text>
						</Pressable>
				</ScrollView>
		);
}
const	styles	=	StyleSheet.create({
		scroll:	{
				flex:	1,
				backgroundColor:	'#f0edf4',
		},
		container:	{
				padding:	24,
		},
		carregando:	{
				flex:	1,
				alignItems:	'center',
				justifyContent:	'center',
				backgroundColor:	'#f5f0e8',
		},
		carregandoTexto:	{
				marginTop:	12,
				fontSize:	16,
				color:	'#6b6560',
		},
		label:	{
				fontSize:	15,
				fontWeight:	'bold',
				color:	'#3d3935',
				marginBottom:	8,
		},
		input:	{
				backgroundColor:	'#ffffff',
				borderWidth:	1,
				borderColor:	'#ddd6ca',
				borderRadius:	12,
				padding:	14,
				fontSize:	15,
				marginBottom:	18,
		},
		inputGrande:	{
				height:	120,
				textAlignVertical:	'top',
		},
		linha:	{
				flexDirection:	'row',
				flexWrap:	'wrap',
				marginBottom:	12,
		},
		pill:	{
				backgroundColor:	'#ffffff',
				borderRadius:	20,
				paddingVertical:	8,
				paddingHorizontal:	14,
				marginRight:	8,
				marginBottom:	8,
		},
		pillAtiva:	{
				backgroundColor:	'#7a9e7e',
				borderRadius:	20,
				paddingVertical:	8,
				paddingHorizontal:	14,
				marginRight:	8,
				marginBottom:	8,
		},
		pillTexto:	{
				fontSize:	13,
				color:	'#6b6560',
		},
		pillTextoAtivo:	{
				fontSize:	13,
				fontWeight:	'bold',
				color:	'#ffffff',
		},
		button:	{
				backgroundColor:	'#7a9e7e',
				padding:	16,
				borderRadius:	12,
				alignItems:	'center',
				marginTop:	10,
		},
		buttonText:	{
				color:	'#ffffff',
				fontSize:	16,
				fontWeight:	'bold',
		},
		cancelar:	{
				padding:	16,
				alignItems:	'center',
		},
		cancelarTexto:	{
				fontSize:	15,
				fontWeight:	'bold',
				color:	'#6b6560',
		},
});