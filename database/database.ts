import type { SQLiteDatabase } from 'expo-sqlite';

export async function inicializarBanco(db: SQLiteDatabase) {

    // 1. Criar as tabelas
    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS praticas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            modalidade TEXT NOT NULL,
            subcategoria TEXT NOT NULL,
            nivel TEXT NOT NULL,
            duracao INTEGER NOT NULL,
            descricao TEXT NOT NULL,
            passos TEXT,
            imagem TEXT
        );

        CREATE TABLE IF NOT EXISTS sessao (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            duracao INTEGER NOT NULL,
            concluida INTEGER NOT NULL
        );
    `);

    // 2. Verificar se já existe alguma prática
    const primeira = await db.getFirstAsync(
        `SELECT * FROM praticas`
    );

    // 3. Se o banco estiver vazio, inserir as 11 práticas
    if (!primeira) {
        await db.execAsync(`

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Cachorro Olhando para Baixo',
                'Yoga',
                'Posturas (Asanas)',
                'Iniciante',
                5,
                'Corpo em V invertido que alonga costas e pernas e fortalece os braços.',
                '1. Comece nos quatro apoios e caminhe as mãos um pouco à frente, firmando os dedos dos pés no chão.
                2. Expire, empurre o chão com as mãos e eleve o quadril para cima e para trás, formando um V invertido.
                3. Mantenha os braços estendidos e os ombros afastados das orelhas, pressionando bem as palmas
                4. Priorize a coluna longa: se a parte de trás das coxas estiver rígida, dobre um pouco os joelhos
                5. Relaxe a cabeça entre os braços e permaneça por 3 a 5 respirações profundas.',
                'yoga_cachorro'
            );

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Postura do Pombo',
                'Yoga',
                'Posturas (Asanas)',
                'Intermediário',
                10,
                'Abertura de quadril que alivia tensões na lombar e nos glúteos.',
                '1. A partir do Cachorro Olhando para Baixo, traga o joelho direito à frente, apoiando atrás do punho direito.
                2. Posicione a canela direita na diagonal, com o pé perto da virilha esquerda.
                3. Estenda a perna esquerda para trás, apoiando o joelho e o peito do pé, com o quadril voltado para a frente.
                4. Mantenha o tronco ereto, com as pontas dos dedos das mãos no chão, abrindo o peito.
                5. Se quiser relaxar mais, expire e incline o tronco à frente, apoiando os antebraços ou a testa.6. Permaneça de 5 a 10 respirações e repita com a outra perna.',
                'yoga_pombo'
            );

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Postura da Criança',
                'Yoga',
                'Posturas (Asanas)',
                'Iniciante',
                5,
                'Postura de descanso que relaxa ombros, pescoço e costas.',
                '1. Ajoelhe-se, sente sobre os calcanhares e abra os joelhos na largura do quadril.
                2. Incline o tronco à frente até a testa encostar no chão e estenda os braços para a frente.
                3. Relaxe os ombros e o pescoço e respire fundo, sentindo o ar expandir as costas.',
                'yoga_crianca'
            );

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Postura da Árvore',
                'Yoga',
                'Posturas (Asanas)',
                'Iniciante',
                5,
                'Equilíbrio em uma perna com foco em um ponto fixo.',
                '1. Em pé, leve o peso para a perna esquerda e apoie a sola do pé direito na coxa ou na panturrilha, evitando o joelho.
                2. Escolha um ponto fixo à frente para manter o foco e junte as palmas das mãos na frente do peito.
                3. Segure o equilíbrio por algumas respirações e troque de lado.',
                'yoga_arvore'
            );

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Postura do Cadáver',
                'Yoga',
                'Posturas (Asanas)',
                'Iniciante',
                10,
                'Relaxamento deitado, soltando o peso do corpo e observando a respiração.',
                '1. Deite de costas, afaste as pernas de forma confortável e deixe os pés caírem para os lados.
                2. Posicione os braços ao lado do corpo, um pouco afastados, com as palmas voltadas para cima.
                3. Feche os olhos, solte todo o peso do corpo no chão e apenas observe a respiração natural.',
                'yoga_cadaver'
            );

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Nadi Shodhana',
                'Yoga',
                'Respiração (Pranayamas)',
                'Intermediário',
                10,
                'Respiração alternada entre as narinas para acalmar a mente.',
                '1. Sente confortavelmente com a coluna ereta e use o polegar direito para fechar a narina direita.
                2. Inspire lentamente pela narina esquerda.
                3. Feche a narina esquerda com o dedo anelar, libere a direita e expire por ela.
                4. Inspire pela direita, troque os dedos e expire pela esquerda. Repita o ciclo por alguns minutos.',
                'yoga_nadi'
            );

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Dirga Pranayama',
                'Yoga',
                'Respiração (Pranayamas)',
                'Iniciante',
                10,
                'Respiração completa em três partes: abdômen, costelas e peito.',
                '1. Sente ou deite com uma mão sobre a barriga e a outra sobre as costelas.
                2. Inspire preenchendo primeiro o abdômen, depois a caixa torácica e por fim o peito.
                3. Expire na ordem inversa: esvazie o peito, recolha as costelas e contraia levemente o abdômen.',
                'yoga_dirga'
            );

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Yoga Nidra',
                'Yoga',
                'Foco e Relaxamento',
                'Intermediário',
                20,
                'Relaxamento profundo guiado, percorrendo o corpo dos pés à cabeça.',
                '1. Deite na Postura do Cadáver e feche os olhos.
                2. Leve a atenção, uma parte de cada vez, dos pés até a cabeça, soltando cada região.
                3. Permaneça no limite entre estar acordado e adormecer, sem lutar contra os pensamentos.',
                'yoga_nidra'
            );

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Mindfulness Respiratório',
                'Meditação',
                'Ancoragem e Foco',
                'Iniciante',
                10,
                'Atenção na respiração, voltando a ela sempre que a mente se dispersar.',
                '1. Sente de forma confortável, com a coluna ereta mas sem tensão.
                2. Leve a atenção ao ponto onde sente a respiração com mais clareza: narinas, peito ou abdômen.
                3. Quando perceber que a mente se dispersou, note o pensamento sem julgar e volte suavemente para a respiração.',
                'meditacao_mindfulness'
            );

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Mapeamento Sensorial',
                'Meditação',
                'Varredura Corporal',
                'Intermediário',
                15,
                'Percorra o corpo com a atenção, dos pés à cabeça, soltando tensões.',
                '1. Sente ou deite confortavelmente e feche os olhos.
                2. Leve o foco para os dedos dos pés, observando calor, frio, tensão ou relaxamento.
                3. Suba lentamente pelas pernas, quadril, costas, abdômen, braços e cabeça, liberando as tensões que encontrar.',
                'meditacao_mapeamento'
            );

            INSERT INTO praticas (
                nome,
                modalidade,
                subcategoria,
                nivel,
                duracao,
                descricao,
                passos,
                imagem
            )
            VALUES (
                'Loving-Kindness (Metta)',
                'Meditação',
                'Cultivo de Estados Mentais',
                'Intermediário',
                15,
                'Envie desejos de bem-estar a si, a quem ama e a todos os seres.',
                '1. Sente em silêncio, leve a atenção ao coração e visualize você mesmo.
                2. Repita mentalmente frases de bem-estar, como: que eu esteja em paz, que eu seja saudável, que eu viva com leveza.
                3. Traga à mente alguém que você ama e repita as mesmas frases para essa pessoa.
                4. Amplie aos poucos para pessoas neutras, para alguém com quem a relação é difícil e, por fim, para todos os seres.',
                'meditacao_metta'
            );

        `);
    }
}
    

