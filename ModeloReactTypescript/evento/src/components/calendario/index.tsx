import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Open from '../../assets/images/open.png'
import './style.css'

const Calendario: React.FC = () => {
  const [ano, setAno] = useState<number>(0);
  const [mes, setMes] = useState<number>(0);
  const [primeiro, setPrimeiro] = useState<string>('0');
  const [segundo, setSegundo] = useState<string>('0');
  const [data, setData] = useState<string>('');
  const [dias, setDias] = useState<JSX.Element[]>([]);

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const transformNomeMes = (nomeMes: string) => {
    return meses.findIndex((mes) => mes === nomeMes) + 1;
  };

  const carregarCalendario = () => {
    setData(`${meses[mes]} ${ano}`);

    const numAtual = transformNomeMes(data.slice(0, -5));
    const priData = new Date(ano, mes, 1).getDay();
    const ultData = new Date(ano, mes + 1, 0).getDate();
    const ultDataMes = new Date(ano, mes, ultData).getDay();
    const ultDataProxMes = new Date(ano, mes, 0).getDate();
    const liTag: JSX.Element[] = [];

    for (let i = priData; i > 0; i--) {
      liTag.push(<li className="inactive">{ultDataProxMes - i + 1}</li>);
    }

    const date = new Date();
    const diaHoje = date.getDate();
    const mesComeco = mes + 1;

    if (mesComeco === numAtual) {
      for (let i = 1; i < diaHoje; i++) {
        liTag.push(<li className="inactive">{i}</li>);
      }

      for (let i = diaHoje; i <= ultData; i++) {
        const hoje =
          i === diaHoje && mes === new Date().getMonth() && ano === new Date().getFullYear()
            ? 'active'
            : '';
        liTag.push(
          <li className={hoje} onClick={(e) => selecionaData(e)} data-dt={i}>
            {i}
          </li>
        );
      }
    } else if (mesComeco > numAtual || ano > parseInt(data.slice(-4))) {
      for (let i = 1; i <= ultData; i++) {
        liTag.push(<li className="inactive">{i}</li>);
      }
    } else {
      for (let i = 1; i <= ultData; i++) {
        liTag.push(
          <li onClick={(e) => selecionaData(e)} data-dt={i}>
            {i}
          </li>
        );
      }
    }

    for (let i = ultDataMes; i < 6; i++) {
      liTag.push(<li className="inactive">{i - ultDataMes + 1}</li>);
    }

    setDias(liTag);
  };

  const alteraCorData = () => {
    const novaData = data.slice(0, -5);
    const contP = moment(primeiro, 'MMDDYYYY').format('DD');
    const contS = moment(segundo, 'MMDDYYYY').format('DD');
    const mesP = meses[parseInt(moment(primeiro, 'MMDDYYYY').format('MM')) - 1];
    const mesS = meses[parseInt(moment(segundo, 'MMDDYYYY').format('MM')) - 1];

    const numMesP = parseInt(moment(primeiro, 'MMDDYYYY').format('MM'));
    const numMesS = parseInt(moment(segundo, 'MMDDYYYY').format('MM'));
    const numAtual = transformNomeMes(novaData);

    document.querySelector('.dias')?.querySelectorAll('li').forEach((l) => {
      l.classList.remove('activeM');
      l.classList.remove('active');
      if (
        (parseInt(l.getAttribute('dt') || '0') === parseInt(contP) && mesP === novaData) ||
        (parseInt(l.getAttribute('dt') || '0') === parseInt(contS) && mesS === novaData)
      ) {
        l.classList.add('active');
        l.classList.remove('activeM');
      } else if (mesP === novaData && mesS === novaData) {
        if (parseInt(l.getAttribute('dt') || '0') > parseInt(contP) && parseInt(l.getAttribute('dt') || '0') < parseInt(contS)) {
          l.classList.add('activeM');
          l.classList.remove('active');
        } else {
          l.classList.remove('activeM');
          l.classList.remove('active');
        }
      } else if (mesP === novaData) {
        if (parseInt(l.getAttribute('dt') || '0') > parseInt(contP)) {
          l.classList.add('activeM');
          l.classList.remove('active');
        }
      } else if (mesS === novaData) {
        if (parseInt(l.getAttribute('dt') || '0') < parseInt(contS)) {
          l.classList.add('activeM');
          l.classList.remove('active');
        }
      }
      if (numMesP < numAtual && numMesS > numAtual && l.getAttribute('dt') != null) {
        l.classList.add('activeM');
      }
    });
  };

  const selecionaData = (e: React.MouseEvent<HTMLElement>) => {
    const dia = parseInt(e.currentTarget.getAttribute('data-dt') || '0');
    let novaData = data.slice(0, -5);
    const diaStr = dia.toString().padStart(2, '0');
    novaData = moment(`${diaStr}${transformNomeMes(novaData)}${ano}`, 'DDMMYYYY').format('MMDDYYYY');

    if (primeiro === '0') {
      setPrimeiro(novaData);
    } else if (segundo === '0') {
      setSegundo(novaData);
    } else if (novaData > segundo) {
      setSegundo(novaData);
    } else if (novaData > primeiro && novaData < segundo) {
      setPrimeiro(novaData);
    } else if (novaData < primeiro && novaData < segundo) {
      setPrimeiro(novaData);
    } else if (novaData === primeiro || novaData === segundo) {
      setPrimeiro(novaData);
      setSegundo(novaData);
    }

    alteraCorData();

    if (segundo === '0') {
      document.querySelector('#dataForm')!.innerHTML = `${moment(primeiro, 'MMDDYYYY').format('DD/MM/YYYY')} - `;
    } else {
      document.querySelector('#dataForm')!.innerHTML = `${moment(primeiro, 'MMDDYYYY').format(
        'DD/MM/YYYY'
      )} - ${moment(segundo, 'MMDDYYYY').format('DD/MM/YYYY')}`;
    }
  };

  useEffect(() => {
    const date = new Date();
    const anoAtual = date.getFullYear();
    const mesAtual = date.getMonth();
    const diaHoje = date.getDate();
    const mesComeco = mesAtual + 1;

    setAno(anoAtual);
    setMes(mesAtual);

    carregarCalendario();
  }, []);

  useEffect(() => {
    const antproxIcon = document.querySelectorAll('.icons img');
  
    const handleIconClick = (icon: Element) => {
      setMes((prevMes) => (icon.id === 'ant' ? prevMes - 1 : prevMes + 1));
  
      if (mes < 0 || mes > 11) {
        const date = new Date(ano, mes, new Date().getDate());
        setAno(date.getFullYear());
        setMes(date.getMonth());
      } else {
        const date = new Date();
        setAno(date.getFullYear());
        setMes(date.getMonth());
      }
  
      carregarCalendario();
      alteraCorData();
    };
  
    antproxIcon.forEach((icon) => {
      icon.addEventListener('click', () => {
        handleIconClick(icon);
      });
    });
  
    return () => {
      antproxIcon.forEach((icon) => {
        icon.removeEventListener('click', () => {
          handleIconClick(icon);
        });
      });
    };
  }, [mes, ano]);

  const openCalendario = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.getAttribute('open') === '0') {
      document.querySelector('.fundo')?.classList.remove('model');
      e.currentTarget.setAttribute('open', '1');
      e.currentTarget.querySelector('img')!.style.transform = 'rotate(90deg)';
    } else {
      document.querySelector('.fundo')?.classList.add('model');
      e.currentTarget.setAttribute('open', '0');
      e.currentTarget.querySelector('img')!.style.transform = 'rotate(-90deg)';
    }
  };

  return (
    <div className="input">
      <div className="data-selecionada" onClick={(e) => openCalendario(e)}>
        <span id="dataForm">Data do formulário</span>
        <img src={Open} alt="close" />
      </div>
      <div className="fundo model">
        <div className="header-calendario">
          <p className="data">{data}</p>
          <div className="icons">
            <img id="ant" src={Open} alt="close" />
            <img id="prox" src={Open} alt="close" />
          </div>
        </div>
        <div className="calendario">
          <ul className="semana">
            <li>Dom</li>
            <li>Seg</li>
            <li>Ter</li>
            <li>Qua</li>
            <li>Qui</li>
            <li>Sex</li>
            <li>Sab</li>
          </ul>
          <ul className="dias">{dias}</ul>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
