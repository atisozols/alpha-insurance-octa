import CarDetailsInput from '@/components/CarDetailsInput';
import CheckoutButton from '@/components/CheckoutButton';
import Container from '@/components/Container';
import Offers from '@/components/Offers';

export default function Home() {
  return (
    <Container>
      <CarDetailsInput />
      <Offers />
      <CheckoutButton />
    </Container>
  );
}
