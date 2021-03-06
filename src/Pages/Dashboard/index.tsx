import React, { useState, useMemo, useCallback } from 'react';
import ContentHeader from '../../Components/ContentHeader';
import SelectInput from '../../Components/SelectInput';
import { Container, Content } from './styles';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';
import WalletBox from '../../Components/WalletBox';
import MessageBox from '../../Components/MessageBox';
import PieChart from '../../Components/PieChart';
import happy from '../../assets/happy.svg';
import sad from '../../assets/sad.svg';
import grinning from '../../assets/grinning.svg';
import HistoryBox from '../../Components/HistoryBox';
import BarChartBox from '../../Components/BarChartBox';

//FC = Functional component
const Dashboard: React.FC = () => {
  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );
  // eslint-disable-next-line
  const totalExpense = useMemo(() => {
    // eslint-disable-next-line
    let total: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount! Amount must be number');
        }
      }
    });
    return total;
    // quando mudar, ele calcula dnv
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    // eslint-disable-next-line
    let total: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount! Amount must be number');
        }
      }
    });
    return total;
    // quando mudar, ele calcula dnv
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpense;
  }, [totalGains, totalExpense]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que triste',
        description: 'Neste m??s voc?? gastou mais do que deveria',
        footerText:
          'Verifique seus gastos e tente cortar algumas coisas desnecess??rias',
        icon: sad,
      };
    } else if (totalGains === 0 && totalExpense === 0) {
      return {
        title: 'Oops!',
        description: 'N??o foi encontrado registros de entrada ou sa??das',
        footerText:
          'Parece que voc?? n??o cadastrou nenhum registro neste m??s e ano selecionados',
        icon: grinning,
      };
    } else if (totalBalance === 0) {
      return {
        title: 'UFAA!',
        description: 'Neste m??s voc?? gastou exatamente o que ganhou',
        footerText: 'Tenha cuidado. No pr??ximo m??s tente poupar seu dinheiro',
        icon: grinning,
      };
    } else {
      return {
        title: 'Muito bem!',
        description: 'Sua carteira est?? positiva',
        footerText: 'Continue assim, considere investir seu dinheiro!',
        icon: happy,
      };
    }
  }, [totalBalance, totalGains, totalExpense]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpense;

    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpense / total) * 100;

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: percentGains ? Number(percentGains.toFixed(1)) : 0,
        color: '#E44C4E',
      },
      {
        name: 'Sa??das',
        value: totalExpense,
        percent: percentExpenses ? Number(percentExpenses.toFixed(1)) : 0,
        color: '#F7931B',
      },
    ];
    return data;
  }, [totalGains, totalExpense]);

  const historyData = useMemo(() => {
    return listOfMonths.map((_, monthIndex) => {
      let amountEntry = 0;
      gains.forEach((gain) => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMonth === monthIndex && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);
          } catch {
            throw new Error('Error during parsing amountEntry');
          }
        }
      });

      let amountOutput = 0;
      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseMonth === monthIndex && expenseYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount);
          } catch {
            throw new Error('Error during parsing amountOutput');
          }
        }
      });

      return {
        monthNumber: monthIndex,
        month: listOfMonths[monthIndex].substr(0, 3),
        amountEntry,
        amountOutput,
      };
    });
  }, [yearSelected]);

  const relationExpensivesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === 'recorrente') {
          amountRecurrent += Number(expense.amount);
        }
        if (expense.frequency === 'eventual') {
          amountEventual += Number(expense.amount);
        }
      });
    const total = amountRecurrent + amountEventual;

    const recurrentPercent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: '#F7931B',
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: '#E44C4E',
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === 'recorrente') {
          amountRecurrent += Number(gain.amount);
        }
        if (gain.frequency === 'eventual') {
          amountEventual += Number(gain.amount);
        }
      });
    const total = amountRecurrent + amountEventual;

    const recurrentPercent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: '#F7931B',
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: '#E44C4E',
      },
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error('Error during parse month: ' + error.message);
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (error) {
      throw new Error('Error during parse year: ' + error.message);
    }
  }, []);

  //o selectinput ?? o children que informamos no contentheader
  return (
    <Container>
      <ContentHeader title='Dashboard' lineColor='#F7931B'>
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>
      <Content>
        <WalletBox
          title='Saldo'
          ammount={totalBalance}
          footerLabel='Atualizado com base nas entradas e sa??das'
          icon='dollar'
          color='#4E41F0'
          animationTime={.5}
        />
        <WalletBox
          title='Entradas'
          ammount={totalGains}
          footerLabel='Atualizado com base nas entradas e sa??das'
          icon='arrowUp'
          color='#F7931B'
          animationTime={.7}
        />
        <WalletBox
          title='Sa??das'
          ammount={totalExpense}
          footerLabel='Atualizado com base nas entradas e sa??das'
          icon='arrowDown'
          color='#E44C4E'
          animationTime={.9}
        />

        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        ></MessageBox>

        <PieChart data={relationExpensesVersusGains} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry='#F7931B'
          lineColorAmountOutput='#E44C4E'
        />
        <BarChartBox
          title='Sa??das'
          data={relationExpensivesRecurrentVersusEventual}
        />
        <BarChartBox
          title='Entradas'
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
