import	{View,Text,StyleSheet,Pressable,FlatList,Alert,} from'react-native';
import	{useSQLiteContext}	from	'expo-sqlite';
import	{useEffect,	useState}	from	'react';
import	PraticaCard	from	'../components/PraticaCard';
import	type	{Pratica} from	'../components/PraticaCard';

export	default	function	Praticas(props:	any)	{
		const	db	=	useSQLiteContext();
		const	[praticas,	setPraticas]	=	useState<Pratica[]>([]);
		const	[modalidade,	setModalidade]	=	useState('Todas');
		const	[subcategoria,	setSubcategoria]	=	useState('Todas');
		const	[nivel,	setNivel]	=	useState('Todos');
		useEffect(()	=>	{
				carregarPraticas();
		},	[]);
		async	function	carregarPraticas()	{
				const	resultado	=	await	db.getAllAsync(`
						SELECT	*
						FROM	praticas
						ORDER	BY	id
				`)	as	Pratica[];
				setPraticas(resultado);
		}
		//	Exclui	uma	prática
		function	excluirPratica(id:	number)	{
				Alert.alert(
						'Excluir',
						'Deseja	excluir	esta	prática?',
						[
								{
										text:	'Cancelar',
								},
								{
										text:	'Excluir',
										onPress:	async	()	=>	{
												await	db.runAsync(
														`
														DELETE	FROM	praticas
														WHERE	id	=	?
														`,
														id
												);
												carregarPraticas();
										},
								},
						]
				);
		}
		//	Navega	para	a	tela	de	edição
		function	editarPratica(id:	number)	{
				props.navigation.navigate('EditarPratica',	{	id:	id	});
		}
		function	escolherModalidade(nova:	string)	{
				setModalidade(nova);
				setSubcategoria('Todas');
		}
		const	subcategorias	=
				modalidade	===	'Yoga'
						?	['Posturas	(Asanas)',	'Respiração	(Pranayamas)',	'Foco	e	Relaxamento']
						:	modalidade	===	'Meditação'
								?	['Ancoragem	e	Foco',	'Varredura	Corporal',	'Cultivo	de	Estados	Mentais']
								:	[];
		//	Filtro	1:	modalidade
		const	filtradasPorModalidade	=
				modalidade	===	'Todas'
						?	praticas
						:	praticas.filter(
										pratica	=>	pratica.modalidade	===	modalidade
								);
		//	Filtro	2:	subcategoria
		const	filtradasPorSubcategoria	=
				subcategoria	===	'Todas'
						?	filtradasPorModalidade
						:	filtradasPorModalidade.filter(
										pratica	=>	pratica.subcategoria	===	subcategoria
								);
		//	Filtro	3:	nível
		const	praticasFiltradas	=
				nivel	===	'Todos'
						?	filtradasPorSubcategoria
						:	filtradasPorSubcategoria.filter(
										pratica	=>	pratica.nivel	===	nivel
								);
		return	(
				<View	style={styles.container}>
						<Text	style={styles.title}>Práticas</Text>
						<Text	style={styles.subtitle}>
								Escolha	uma	prática	para	começar
						</Text>
						<Text	style={styles.filtroTitulo}>Modalidade</Text>
						<View	style={styles.filtroLinha}>
								<Pressable
										style={
												modalidade	===	'Todas'
														?	styles.pillAtiva
														:	styles.pill
										}
										onPress={()	=>	escolherModalidade('Todas')}
								>
										<Text
												style={
														modalidade	===	'Todas'
																?	styles.pillTextoAtivo
																:	styles.pillTexto
												}
										>
												Todas
										</Text>
								</Pressable>
								<Pressable
										style={
												modalidade	===	'Yoga'
														?	styles.pillAtiva
														:	styles.pill
										}
										onPress={()	=>	escolherModalidade('Yoga')}
								>
										<Text
												style={
														modalidade	===	'Yoga'
																?	styles.pillTextoAtivo
																:	styles.pillTexto
												}
										>
												Yoga
										</Text>
								</Pressable>
								<Pressable
										style={
												modalidade	===	'Meditação'
														?	styles.pillAtiva
														:	styles.pill
										}
										onPress={()	=>	escolherModalidade('Meditação')}
								>
										<Text
												style={
														modalidade	===	'Meditação'
																?	styles.pillTextoAtivo
																:	styles.pillTexto
												}
										>
												Meditação
										</Text>
								</Pressable>
						</View>
						{subcategorias.length	>	0	&&	(
								<View>
										<Text	style={styles.filtroTitulo}>Subcategoria</Text>
										<View	style={styles.filtroLinha}>
												<Pressable
														style={
																subcategoria	===	'Todas'
																		?	styles.pillAtiva
																		:	styles.pill
														}
														onPress={()	=>	setSubcategoria('Todas')}
												>
														<Text
																style={
																		subcategoria	===	'Todas'
																				?	styles.pillTextoAtivo
																				:	styles.pillTexto
																}
														>
																Todas
														</Text>
												</Pressable>
												{subcategorias.map(sub	=>	(
														<Pressable
																key={sub}
																style={
																		subcategoria	===	sub
																				?	styles.pillAtiva
																				:	styles.pill
																}
																onPress={()	=>	setSubcategoria(sub)}
														>
																<Text
																		style={
																				subcategoria	===	sub
																						?	styles.pillTextoAtivo
																						:	styles.pillTexto
																		}
																>
																		{sub}
																</Text>
														</Pressable>
												))}
										</View>
								</View>
						)}
						<Text	style={styles.filtroTitulo}>Nível</Text>
						<View	style={styles.filtroLinha}>
								<Pressable
										style={
												nivel	===	'Todos'
														?	styles.pillAtiva
														:	styles.pill
										}
										onPress={()	=>	setNivel('Todos')}
								>
										<Text
												style={
														nivel	===	'Todos'
																?	styles.pillTextoAtivo
																:	styles.pillTexto
												}
										>
												Todos
										</Text>
								</Pressable>
								<Pressable
										style={
												nivel	===	'Iniciante'
														?	styles.pillAtiva
														:	styles.pill
										}
										onPress={()	=>	setNivel('Iniciante')}
								>
										<Text
												style={
														nivel	===	'Iniciante'
																?	styles.pillTextoAtivo
																:	styles.pillTexto
												}
										>
												Iniciante
										</Text>
								</Pressable>
								<Pressable
										style={
												nivel	===	'Intermediário'
														?	styles.pillAtiva
														:	styles.pill
										}
										onPress={()	=>	setNivel('Intermediário')}
								>
										<Text
												style={
														nivel	===	'Intermediário'
																?	styles.pillTextoAtivo
																:	styles.pillTexto
												}
										>
												Intermediário
										</Text>
								</Pressable>
						</View>
						<Pressable
								style={styles.buttonNovo}
								onPress={()	=>
										props.navigation.navigate('CadastroPratica')
								}
						>
								<Text	style={styles.buttonText}>+	Nova	prática</Text>
						</Pressable>
						<Pressable
								style={styles.buttonAtualizar}
								onPress={carregarPraticas}
						>
								<Text	style={styles.buttonText}>Atualizar	lista</Text>
						</Pressable>
						<FlatList
								data={praticasFiltradas}
								keyExtractor={(item)	=>
										item.id.toString()
								}
								renderItem={({	item	})	=>	(
										<PraticaCard
												pratica={item}
												onExcluir={excluirPratica}
												onEditar={editarPratica}
												onAbrir={(id)	=>
														props.navigation.navigate('Detalhes',	{	id:	id	})
												}
										/>
								)}
						/>
				</View>
		);
}
const	styles	=	StyleSheet.create({
		container:	{
				flex:	1,
				padding:	24,
				backgroundColor:	'#f0edf4',
		},

		title:	{
				fontSize:	30,
				fontWeight:	'bold',
				color:	'#7a9e7e',
				marginBottom:	6,
		},

		subtitle:	{
				fontSize:	16,
				color:	'#6b6560',
				marginBottom:	16,
		},

		filtroTitulo:	{
				fontSize:	13,
				fontWeight:	'bold',
				color:	'#6b6560',
				marginBottom:	8,
		},

		filtroLinha:	{
				flexDirection:	'row',
				flexWrap:	'wrap',
				marginBottom:	16,
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

		buttonNovo:	{
				backgroundColor:	'#7a9e7e',
				padding:	12,
				borderRadius:	12,
				alignItems:	'center',
				marginBottom:	10,
		},

		buttonAtualizar:	{
				backgroundColor:	'#9b8ec4',
				padding:	12,
				borderRadius:	12,
				alignItems:	'center',
				marginBottom:	16,
		},
        
		buttonText:	{
				color:	'#ffffff',
				fontSize:	15,
				fontWeight:	'bold',
		},
});