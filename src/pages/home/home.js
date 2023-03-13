import React, {useState, useEffect} from 'react';
import * as s from './styled-home';
import {BarraPesquisa, RodapeBotoes, Musica} from '../../components';
import {icons} from '../../assets';
import {useSearch} from '../../context';

export default function Home({navigation}) {
  const {loading, musicasCadastradas} = useSearch();
  const [pesquisa, setPesquisa] = useState('');
  const [loadingPesquisa, setLoadingPesquisa] = useState(false);

  const [musicasPesquisadas, setMusicasPesquisadas] = useState([]);

  async function pesquisarMusica() {
    setLoadingPesquisa(true);
    let filtro = await musicasCadastradas.filter(musica =>
      musica.nomeMusica.toLowerCase().includes(pesquisa.toLowerCase()),
    );

    setMusicasPesquisadas(filtro);
    setTimeout(() => {
      setLoadingPesquisa(false);
    }, 100);
  }

  useEffect(() => {
    if (pesquisa) pesquisarMusica();
  }, [pesquisa]);

  return (
    <s.SafeAreaView>
      <BarraPesquisa value={pesquisa} setValue={setPesquisa} />
      <s.ScrollView
        style={{marginBottom: musicasCadastradas.length > 0 ? 65 : 0}}>
        {loading || loadingPesquisa ? (
          <s.Container>
            <s.Text style={{fontFamily: 'Nunito-Regular'}}>
              {pesquisa ? 'Procurando música(s)...' : 'Carregando músicas...'}
            </s.Text>
            <s.Icon source={icons.pesquisando} />
          </s.Container>
        ) : pesquisa && musicasPesquisadas.length > 0 ? (
          musicasPesquisadas.map((musica, index) => (
            <Musica
              key={musica.id}
              posicao={index}
              dados={musica}
              par={index % 2 === 0}
              navigation={navigation}
              refresh={() => setPesquisa(prev => prev)}
            />
          ))
        ) : !pesquisa && musicasCadastradas.length > 0 ? (
          musicasCadastradas.map((musica, index) => (
            <Musica
              key={musica.id}
              posicao={index}
              dados={musica}
              par={index % 2 === 0}
              navigation={navigation}
              refresh={() => setPesquisa('')}
            />
          ))
        ) : (
          <s.Container>
            <s.Text
              style={{
                fontFamily: 'Nunito-Regular',
                marginRight: pesquisa ? 60 : 25,
                marginLeft: pesquisa ? 60 : 25,
                marginBottom: 75,
              }}>
              {pesquisa
                ? `Música não encontrada. ${'\n'} Para cadastrá-la, clique no botão abaixo`
                : 'Você ainda não adicionou nenhuma música'}
            </s.Text>

            <s.Icon source={icons.semMusicas} />
          </s.Container>
        )}
      </s.ScrollView>

      <RodapeBotoes
        navigation={navigation}
        limparPesquisa={() => setPesquisa('')}
      />
    </s.SafeAreaView>
  );
}
