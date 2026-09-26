import	{
		View,
		Text,
		Pressable,
		FlatList,
		StyleSheet,
}	from	'react-native';
import	{	useEffect,	useState	}	from	'react';
import	{	useSQLiteContext	}	from	'expo-sqlite';
//	Define	o	tipo	do	item	da	sessão
type	ItemSessao	=	{
		id:	number;
		nome:	string;
		duracao:	number;
		concluida:	number;
};
export	default	function	MinhaSessao()	{
		const	db	=	useSQLiteContext();
		const	[itens,	setItens]	=	useState<ItemSessao[]>([]);
		useEffect(()	=>	{
				carregarSessao();
		},	[]);
		//	SELECT	na	tabela	sessao
		async	function	carregarSessao()	{
				const	resultado	=	await	db.getAllAsync(`
						SELECT	*
						FROM	sessao
						ORDER	BY	id
				`)	as	ItemSessao[];
				setItens(resultado);
		}
		//	DELETE	na	tabela	sessao
		async	function	removerItem(id:	number)	{
				await	db.runAsync(
						`
						DELETE	FROM	sessao
						WHERE	id	=	?
						`,
						id
				);
				carregarSessao();
		}
		//	Marca	a	prática	como	concluída
		async	function	concluirItem(id:	number)	{
				await	db.runAsync(
						`
						UPDATE	sessao
						SET	concluida	=	1
						WHERE	id	=	?
						`,
						id
				);
				carregarSessao();
		}
		return	(
				<View	style={styles.container}>
						<Text	style={styles.title}>Minha	sessão</Text>
						<Text	style={styles.subtitle}>
								Práticas	escolhidas	para	hoje
						</Text>
						{itens.length	===	0
								?	<Text	style={styles.vazio}>
												Sua	sessão	está	vazia.	Escolha	uma	prática	e	toque	em
												"Adicionar	à	sessão".
										</Text>
								:	<FlatList
												data={itens}
												keyExtractor={(item)	=>
														item.id.toString()
												}
												renderItem={({	item	})	=>	(
														<View	style={styles.card}>
																<View	style={styles.linhaTopo}>
																		<Text	style={styles.nome}>{item.nome}</Text>
																		<Text	style={styles.duracao}>{item.duracao}	min</Text>
																</View>
																{item.concluida	===	1
																		?	<Text	style={styles.concluida}>✓	Concluída</Text>
																		:	<Pressable
																						style={styles.botaoConcluir}
																						onPress={()	=>	concluirItem(item.id)}
																				>
																						<Text	style={styles.textoConcluir}>Concluir</Text>
																				</Pressable>
																}
																<Pressable	onPress={()	=>	removerItem(item.id)}>
																		<Text	style={styles.remover}>Remover</Text>
																</Pressable>
														</View>
												)}
										/>
						}
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
		vazio:	{
				fontSize:	15,
				color:	'#6b6560',
				lineHeight:	22,
		},
		card:	{
				backgroundColor:	'#ffffff',
				borderRadius:	12,
				padding:	16,
				marginBottom:	12,
		},
		linhaTopo:	{
				flexDirection:	'row',
				justifyContent:	'space-between',
				alignItems:	'center',
		},
		nome:	{
				fontSize:	16,
				fontWeight:	'bold',
				color:	'#5f8563',
				flex:	1,
		},
		duracao:	{
				fontSize:	13,
				color:	'#6b6560',
		},
		concluida:	{
				fontSize:	14,
				fontWeight:	'bold',
				color:	'#5a4f8a',
				marginTop:	12,
		},
		botaoConcluir:	{
				backgroundColor:	'#7a9e7e',
				borderRadius:	10,
				paddingVertical:	10,
				alignItems:	'center',
				marginTop:	12,
		},
		textoConcluir:	{
				color:	'#ffffff',
				fontSize:	14,
				fontWeight:	'bold',
		},
		remover:	{
				fontSize:	13,
				fontWeight:	'bold',
				color:	'#6b6560',
				marginTop:	10,
		},
});