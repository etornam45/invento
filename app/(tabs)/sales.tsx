import SaleRecordCard from 'components/SalesCard'
import { ScrollView } from 'tamagui'

export default function Sales() {
  return (
    <ScrollView p='$4' gap='$4'>
      {BOOKS.map((book, index) => (
        <SaleRecordCard key={index} productName={book.title} quantity={book.quantity} price={book.price} paymentMethod={book.paymentMethod} discount={book.discount} />
      ))}
    </ScrollView>
  )
}


const BOOKS = [
  {
    title: 'The Lean Startup',
    quantity: 10,
    price: 20,
    paymentMethod: 'MOMO',
    discount: 10,
  },
  {
    title: 'Zero to One',
    quantity: 5,
    price: 15,
    paymentMethod: 'Cash',
    discount: 5,
  },
  {
    title: 'The Lean Startup',
    quantity: 10,
    price: 20,
    paymentMethod: 'MOMO',
    discount: 10,
  },
  {
    title: 'Zero to One',
    quantity: 5,
    price: 15,
    paymentMethod: 'Cash',
    discount: 5,
  },
  {
    title: 'The Lean Startup',
    quantity: 10,
    price: 20,
    paymentMethod: 'MOMO',
    discount: 10,
  },
  {
    title: 'Zero to One',
    quantity: 5,
    price: 15,
    paymentMethod: 'Cash',
    discount: 5,
  },
  {
    title: 'The Lean Startup',
    quantity: 10,
    price: 20,
    paymentMethod: 'MOMO',
    discount: 10,
  },
  {
    title: 'Zero to One',
    quantity: 5,
    price: 15,
    paymentMethod: 'Cash',
    discount: 5,
  },
  {
    title: 'The Lean Startup',
    quantity: 10,
    price: 20,
    paymentMethod: 'MOMO',
    discount: 10,
  },
  {
    title: 'Zero to One',
    quantity: 5,
    price: 15,
    paymentMethod: 'Cash',
    discount: 5,
  },
]