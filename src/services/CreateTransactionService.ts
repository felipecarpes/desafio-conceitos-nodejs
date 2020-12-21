import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionTDO {
  title: string;
  value: number;
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionTDO): Transaction {

    if(!["income", "outcome"].includes(type)) {
      throw new Error('Transaction type is invalid')
    }

    const { total } = this.transactionsRepository.getBalance();

    if(type === 'outcome' && total < value) {
      throw new Error('You do not have enough balance');
    }

    const transactions = this.transactionsRepository.create({
      title,
      type,
      value
    })

    return transactions;
  }
}

export default CreateTransactionService;
