import React, {useState, useEffect} from 'react';
import * as s from './styled-music';
import {shadow} from '../../assets';
import {toms, storage, removeAcentos, stringAleatoria} from '../../utils';
import {Picker} from '@react-native-picker/picker';
import {useSearch} from '../../context';
import {Toast} from '../../components';

export default function Music({navigation, route}) {
  const {idEditar} = route.params;

  const {musicasCadastradas, buscarMusicas} = useSearch();

  const [nomeMusica, setNomeMusica] = useState();
  const [quemCanta, setQuemCanta] = useState();
  const [tom, setTom] = useState('C');
  const [precisaCifra, setPrecisaCifra] = useState(false);

  const [focus, setFocus] = useState('');

  const [loading, setLoading] = useState(false);

  function verificaSeMusicaExiste() {
    return new Promise((resolve, reject) => {
      let mus = musicasCadastradas;
      let nome = nomeMusica?.toLowerCase();
      let cantor = quemCanta?.toLowerCase();
      let existe = false;

      for (let x = 0; x < mus.length; x++) {
        if (
          mus[x]?.nomeMusica.toLowerCase() === nome &&
          mus[x]?.quemCanta.toLowerCase() === cantor &&
          idEditar &&
          mus[x]?.id !== idEditar
        ) {
          existe = true;
          break;
        }
      }

      if (existe) resolve();
      else reject();
    });
  }

  function salvarMusica() {
    let musicas = [];
    setLoading(true);

    if (musicasCadastradas.length === 0) {
      musicas = [
        {
          id: stringAleatoria(),
          nomeMusica,
          quemCanta,
          tom,
          precisaCifra,
        },
      ];

      storage.save({
        key: 'musicas',
        data: musicas,
        expires: null,
      });

      buscarMusicas();
      Toast.success('Música adicionada!');
      navigation.navigate('Home');
    } else {
      musicas = musicasCadastradas;

      if (idEditar) {
        let indiceMusica;

        for (let pos = 0; pos < musicasCadastradas.length; pos++) {
          if (musicasCadastradas[pos].id === idEditar) {
            indiceMusica = pos;
            break;
          }
        }

        musicas[indiceMusica] = {
          id: musicas[indiceMusica].id,
          nomeMusica,
          quemCanta,
          tom,
          precisaCifra,
        };
      } else {
        musicas.push({
          id: stringAleatoria(),
          nomeMusica,
          quemCanta,
          tom,
          precisaCifra,
        });
      }

      function ordenarSalvar() {
        musicas.sort(function (a, b) {
          let musicaA = removeAcentos(a.nomeMusica).toLowerCase();
          let musicaB = removeAcentos(b.nomeMusica).toLowerCase();

          return musicaA.localeCompare(musicaB);
        });

        storage.save({
          key: 'musicas',
          data: musicas,
          expires: null,
        });

        buscarMusicas();
        Toast.success(idEditar ? 'Música editada!' : 'Música adicionada!');
        navigation.navigate('Home');
      }

      verificaSeMusicaExiste()
        .then(() => {
          Toast.success('Essa música já está cadastrada!');
          setLoading(false);
        })
        .catch(() => ordenarSalvar());
    }
  }

  useEffect(() => {
    if (idEditar) {
      musicasCadastradas.map(musica => {
        if (musica.id === idEditar) {
          setNomeMusica(musica.nomeMusica);
          setQuemCanta(musica.quemCanta);
          setTom(musica.tom);
          setPrecisaCifra(musica.precisaCifra);
        }
      });
    }
  }, []);

  return (
    <s.Content>
      <s.Column>
        <s.TextLabel style={{fontFamily: 'Nunito-Regular'}}>
          Nome da música:
        </s.TextLabel>
        <s.Input
          foco={focus === 'nome'}
          onFocus={() => setFocus('nome')}
          onBlur={() => setFocus('')}
          style={{fontFamily: 'Nunito-Light'}}
          value={nomeMusica}
          onChangeText={text => setNomeMusica(text)}
        />
      </s.Column>

      <s.Column>
        <s.TextLabel style={{fontFamily: 'Nunito-Regular'}}>
          Quem canta?
        </s.TextLabel>
        <s.Input
          foco={focus === 'cantor'}
          onFocus={() => setFocus('cantor')}
          onBlur={() => setFocus('')}
          style={{fontFamily: 'Nunito-Light'}}
          value={quemCanta}
          onChangeText={text => setQuemCanta(text)}
        />
      </s.Column>

      <s.Row>
        <s.Column width="40%" noSpace>
          <s.TextLabel style={{fontFamily: 'Nunito-Regular'}}>Tom:</s.TextLabel>
          <s.Select>
            <Picker
              style={s.styleSelect}
              prompt="Selecione o tom"
              selectedValue={tom}
              onValueChange={itemValue => setTom(itemValue)}>
              {toms.map(tom => (
                <Picker.Item
                  key={tom.value}
                  label={tom.label}
                  value={tom.value}
                />
              ))}
            </Picker>
          </s.Select>
        </s.Column>
        <s.Column width="50%" noSpace>
          <s.TextLabel style={{fontFamily: 'Nunito-Regular'}}>
            Precisa de cifra?
          </s.TextLabel>
          <s.Select>
            <Picker
              style={s.styleSelect}
              prompt="Precisa de cifra?"
              selectedValue={precisaCifra}
              onValueChange={itemValue => setPrecisaCifra(itemValue)}>
              {[
                {value: false, label: 'Não'},
                {value: true, label: 'Sim'},
              ].map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </s.Select>
        </s.Column>
      </s.Row>
      <s.WrapperButton>
        <s.Botão
          style={shadow}
          disabled={
            loading ||
            precisaCifra === null ||
            !tom ||
            !quemCanta ||
            !nomeMusica
          }
          onPress={() => salvarMusica()}>
          <s.TextButton style={{fontFamily: 'Nunito-Black'}}>
            {idEditar ? 'Salvar mudanças' : '+ Adicionar música'}
          </s.TextButton>
        </s.Botão>
      </s.WrapperButton>
    </s.Content>
  );
}
