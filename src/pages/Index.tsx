import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const carBrands = ['Toyota', 'BMW', 'Mercedes', 'Volkswagen', 'Audi', 'Honda', 'Ford', 'Nissan'];
const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());
const partTypes = ['Двигатель', 'Тормозная система', 'Подвеска', 'Электрика', 'Кузов', 'Трансмиссия'];

const products = [
  {
    id: 1,
    name: 'Тормозные колодки',
    brand: 'Toyota',
    year: '2020',
    type: 'Тормозная система',
    price: 3500,
    image: 'https://cdn.poehali.dev/projects/3168740c-61e9-4476-9ee3-6678ba536445/files/0841ca71-9782-4c75-8e77-268180fdbab9.jpg',
    inStock: true
  },
  {
    id: 2,
    name: 'Масляный фильтр',
    brand: 'BMW',
    year: '2021',
    type: 'Двигатель',
    price: 1200,
    image: 'https://cdn.poehali.dev/projects/3168740c-61e9-4476-9ee3-6678ba536445/files/0841ca71-9782-4c75-8e77-268180fdbab9.jpg',
    inStock: true
  },
  {
    id: 3,
    name: 'Амортизатор передний',
    brand: 'Mercedes',
    year: '2019',
    type: 'Подвеска',
    price: 8500,
    image: 'https://cdn.poehali.dev/projects/3168740c-61e9-4476-9ee3-6678ba536445/files/0841ca71-9782-4c75-8e77-268180fdbab9.jpg',
    inStock: true
  },
  {
    id: 4,
    name: 'Свечи зажигания комплект',
    brand: 'Volkswagen',
    year: '2022',
    type: 'Двигатель',
    price: 2400,
    image: 'https://cdn.poehali.dev/projects/3168740c-61e9-4476-9ee3-6678ba536445/files/0841ca71-9782-4c75-8e77-268180fdbab9.jpg',
    inStock: false
  },
  {
    id: 5,
    name: 'Диск тормозной передний',
    brand: 'Audi',
    year: '2020',
    type: 'Тормозная система',
    price: 4200,
    image: 'https://cdn.poehali.dev/projects/3168740c-61e9-4476-9ee3-6678ba536445/files/0841ca71-9782-4c75-8e77-268180fdbab9.jpg',
    inStock: true
  },
  {
    id: 6,
    name: 'Аккумулятор 60Ah',
    brand: 'Honda',
    year: '2021',
    type: 'Электрика',
    price: 6800,
    image: 'https://cdn.poehali.dev/projects/3168740c-61e9-4476-9ee3-6678ba536445/files/0841ca71-9782-4c75-8e77-268180fdbab9.jpg',
    inStock: true
  }
];

const faqItems = [
  { question: 'Как оформить заказ?', answer: 'Выберите нужные запчасти, добавьте в корзину и оформите заказ через форму. Мы свяжемся с вами для подтверждения.' },
  { question: 'Какие способы оплаты доступны?', answer: 'Мы принимаем оплату наличными при получении, банковскими картами онлайн и безналичным переводом для юридических лиц.' },
  { question: 'Сколько времени занимает доставка?', answer: 'Доставка по городу — 1-2 дня, по области — 2-4 дня. Экспресс-доставка доступна в течение 24 часов.' },
  { question: 'Есть ли гарантия на запчасти?', answer: 'Да, на все оригинальные запчасти предоставляется гарантия производителя от 6 до 24 месяцев.' }
];

export default function Index() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('catalog');
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesYear = !selectedYear || product.year === selectedYear;
    const matchesType = !selectedType || product.type === selectedType;
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesYear && matchesType && matchesSearch;
  });

  const addToCart = (id: number) => {
    setCart([...cart, id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-brand-orange to-brand-blue p-2 rounded-lg">
                <Icon name="Wrench" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-orange to-brand-blue bg-clip-text text-transparent">
                  AutoParts Pro
                </h1>
                <p className="text-xs text-muted-foreground">Оригинальные запчасти</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {['catalog', 'about', 'delivery', 'guarantee', 'faq', 'blog', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-medium transition-all hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О компании'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'guarantee' && 'Гарантия'}
                  {section === 'faq' && 'FAQ'}
                  {section === 'blog' && 'Блог'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-brand-orange">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                    ) : (
                      <div className="space-y-3">
                        {cart.map((id, index) => {
                          const product = products.find(p => p.id === id);
                          return product ? (
                            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-primary font-bold">{product.price} ₽</p>
                              </div>
                            </div>
                          ) : null;
                        })}
                        <Button className="w-full mt-4 bg-gradient-to-r from-brand-orange to-brand-blue">
                          Оформить заказ
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Icon name="Menu" size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Меню</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-6">
                    {['catalog', 'about', 'delivery', 'guarantee', 'faq', 'blog', 'contacts'].map((section) => (
                      <button
                        key={section}
                        onClick={() => {
                          setActiveSection(section);
                        }}
                        className={`text-left font-medium transition-all hover:text-primary ${
                          activeSection === section ? 'text-primary' : 'text-gray-600'
                        }`}
                      >
                        {section === 'catalog' && 'Каталог'}
                        {section === 'about' && 'О компании'}
                        {section === 'delivery' && 'Доставка'}
                        {section === 'guarantee' && 'Гарантия'}
                        {section === 'faq' && 'FAQ'}
                        {section === 'blog' && 'Блог'}
                        {section === 'contacts' && 'Контакты'}
                      </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {activeSection === 'catalog' && (
        <>
          <section className="relative bg-gradient-to-r from-brand-orange via-brand-blue to-brand-dark text-white py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/projects/3168740c-61e9-4476-9ee3-6678ba536445/files/7f5ee113-df70-4c8e-925a-a585bd7593ad.jpg')] bg-cover bg-center opacity-20"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
                <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                  Оригинальные запчасти <br />для вашего автомобиля
                </h2>
                <p className="text-xl text-white/90">
                  Более 50 000 позиций в наличии. Быстрая доставка. Гарантия качества.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button size="lg" variant="secondary" className="bg-white text-brand-orange hover:bg-gray-100 font-bold">
                    <Icon name="Search" size={20} className="mr-2" />
                    Подобрать запчасти
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Icon name="Phone" size={20} className="mr-2" />
                    Связаться с нами
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Filter" className="text-brand-orange" />
                  Фильтры поиска
                </h3>
                
                <Card className="border-2 shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Марка автомобиля</label>
                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите марку" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все марки</SelectItem>
                            {carBrands.map(brand => (
                              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Год выпуска</label>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите год" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все годы</SelectItem>
                            {years.map(year => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Тип запчасти</label>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все типы</SelectItem>
                            {partTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Поиск</label>
                        <Input
                          placeholder="Название запчасти..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSelectedBrand('');
                        setSelectedYear('');
                        setSelectedType('');
                        setSearchQuery('');
                      }}
                    >
                      <Icon name="X" size={16} className="mr-2" />
                      Сбросить фильтры
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold">
                    Каталог запчастей
                    <span className="text-muted-foreground text-lg ml-3">
                      ({filteredProducts.length} товаров)
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 animate-slide-up border-2">
                      <CardHeader className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          {!product.inStock && (
                            <Badge className="absolute top-3 right-3 bg-red-500">Нет в наличии</Badge>
                          )}
                          {product.inStock && (
                            <Badge className="absolute top-3 right-3 bg-green-500">В наличии</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                        <div className="space-y-1 text-sm text-muted-foreground mb-3">
                          <p className="flex items-center gap-2">
                            <Icon name="Car" size={16} className="text-brand-orange" />
                            {product.brand} ({product.year})
                          </p>
                          <p className="flex items-center gap-2">
                            <Icon name="Package" size={16} className="text-brand-blue" />
                            {product.type}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-2xl font-bold text-primary">
                            {product.price} ₽
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button 
                          className="w-full bg-gradient-to-r from-brand-orange to-brand-blue hover:opacity-90"
                          disabled={!product.inStock}
                          onClick={() => addToCart(product.id)}
                        >
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          {product.inStock ? 'В корзину' : 'Нет в наличии'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gradient-to-r from-brand-orange/10 to-brand-blue/10">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h3>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-white border-2 rounded-lg px-6">
                      <AccordionTrigger className="text-left font-semibold hover:text-primary">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </>
      )}

      {activeSection === 'about' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">О компании</h2>
            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-lg">
                <strong>AutoParts Pro</strong> — ведущий поставщик оригинальных автозапчастей с 2010 года. 
                Мы работаем напрямую с производителями и официальными дистрибьюторами.
              </p>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card className="text-center p-6 border-2 hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="bg-brand-orange/10 p-4 rounded-full">
                      <Icon name="Award" size={32} className="text-brand-orange" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2">14+ лет</h3>
                  <p className="text-muted-foreground">На рынке</p>
                </Card>
                <Card className="text-center p-6 border-2 hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="bg-brand-blue/10 p-4 rounded-full">
                      <Icon name="Package" size={32} className="text-brand-blue" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2">50 000+</h3>
                  <p className="text-muted-foreground">Позиций</p>
                </Card>
                <Card className="text-center p-6 border-2 hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="bg-brand-orange/10 p-4 rounded-full">
                      <Icon name="Users" size={32} className="text-brand-orange" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2">10 000+</h3>
                  <p className="text-muted-foreground">Клиентов</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'delivery' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Доставка и оплата</h2>
            <div className="space-y-6">
              <Card className="p-6 border-2">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange/10 p-3 rounded-full">
                    <Icon name="Truck" size={24} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Доставка по городу</h3>
                    <p className="text-muted-foreground">1-2 рабочих дня. Бесплатно при заказе от 5000 ₽</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-2">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-blue/10 p-3 rounded-full">
                    <Icon name="MapPin" size={24} className="text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Доставка по России</h3>
                    <p className="text-muted-foreground">3-7 рабочих дней. Транспортными компаниями СДЭК, Boxberry</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-2">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange/10 p-3 rounded-full">
                    <Icon name="CreditCard" size={24} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Способы оплаты</h3>
                    <p className="text-muted-foreground">Наличные, карты, безналичный расчёт для юр. лиц</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'guarantee' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Гарантия качества</h2>
            <Card className="p-8 border-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Shield" size={32} className="text-brand-orange flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-2">Официальная гарантия</h3>
                    <p className="text-muted-foreground">Все запчасти имеют гарантию производителя от 6 до 24 месяцев</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="RefreshCw" size={32} className="text-brand-blue flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-2">Возврат и обмен</h3>
                    <p className="text-muted-foreground">14 дней на возврат товара надлежащего качества</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="CheckCircle2" size={32} className="text-brand-orange flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-2">Проверка подлинности</h3>
                    <p className="text-muted-foreground">Каждая деталь проходит проверку на оригинальность</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'faq' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border-2 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {activeSection === 'blog' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-bold mb-8">Блог</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-gradient-to-r from-brand-orange to-brand-blue h-48 rounded-lg mb-4"></div>
                    <h3 className="font-bold text-xl">Как выбрать правильные тормозные колодки</h3>
                    <p className="text-sm text-muted-foreground">15 декабря 2024</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Подробное руководство по выбору тормозных колодок для вашего автомобиля...
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="p-0 text-primary">
                      Читать далее <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 border-2">
                <h3 className="font-bold text-xl mb-4">Свяжитесь с нами</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" className="text-brand-orange" />
                    <span>+7 (495) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" className="text-brand-blue" />
                    <span>info@autoparts-pro.ru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" className="text-brand-orange" />
                    <span>Москва, ул. Автозаводская, д. 23</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" className="text-brand-blue" />
                    <span>Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-2">
                <h3 className="font-bold text-xl mb-4">Напишите нам</h3>
                <div className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Телефон" type="tel" />
                  <Button className="w-full bg-gradient-to-r from-brand-orange to-brand-blue">
                    Отправить сообщение
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-brand-dark text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">AutoParts Pro</h4>
              <p className="text-white/70 text-sm">
                Оригинальные запчасти для вашего автомобиля с 2010 года
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Двигатель</li>
                <li>Тормозная система</li>
                <li>Подвеска</li>
                <li>Электрика</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>О компании</li>
                <li>Доставка</li>
                <li>Гарантия</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>+7 (495) 123-45-67</li>
                <li>info@autoparts-pro.ru</li>
                <li>Москва, ул. Автозаводская</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
            © 2024 AutoParts Pro. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
