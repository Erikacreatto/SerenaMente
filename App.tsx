import	{	NavigationContainer	}	from	'@react-navigation/native';
import	{	createNativeStackNavigator	}	from	'@react-navigation/native-stack';
import	{	SQLiteProvider	}	from	'expo-sqlite';
import	{	inicializarBanco	}	from	'./database/database';
import	Home	from	'./screens/Home';
import	Categoria	from './screens/Categoria';
import	Detalhes	from	'./screens/Detalhes';
import	Praticas	from	'./screens/Praticas';
import	CadastroPratica	from	'./screens/CadastroPratica';
import	EditarPratica	from	'./screens/EditarPratica';
import	MinhaSessao	from	'./screens/MinhaSessao';
const	Stack	=	createNativeStackNavigator();
export	default	function	App()	{
		return	(
				<SQLiteProvider
						databaseName="serenamente9.db"
						onInit={inicializarBanco}
				>
						<NavigationContainer>
								<Stack.Navigator>
										<Stack.Screen
												name="Home"
												component={Home}
												options={{
														title:	'Início',
												}}
										/>
										<Stack.Screen
												name="Categoria"
												component={Categoria}
												options={{
														title:	'Categoria',
												}}
										/>
										<Stack.Screen
												name="Detalhes"
												component={Detalhes}
												options={{
														title:	'Detalhes',
												}}
										/>
										<Stack.Screen
												name="Praticas"
												component={Praticas}
												options={{
														title:	'Práticas',
												}}
										/>
										<Stack.Screen
												name="CadastroPratica"
												component={CadastroPratica}
												options={{
														title:	'Nova	prática',
												}}
										/>
										<Stack.Screen
												name="EditarPratica"
												component={EditarPratica}
												options={{
														title:	'Editar	prática',
												}}
										/>
										<Stack.Screen
												name="MinhaSessao"
												component={MinhaSessao}
												options={{
														title:	'Minha	sessão',
												}}
										/>
								</Stack.Navigator>
						</NavigationContainer>
				</SQLiteProvider>
		);
}