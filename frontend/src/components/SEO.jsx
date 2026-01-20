// SEO.jsx
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Разработка сайтов и ботов под ключ | Full Stack Developer",
  description = "Профессиональная разработка сайтов, Telegram ботов, скриптов Lua. Создание сайтов под ключ, верстка макетов, мини-приложения в Telegram. Фиксированные цены, гарантия качества.",
  keywords = "разработка сайтов, создание сайтов, telegram боты, Lua скрипты, верстка макетов, мини-приложения, fullstack разработчик, заказать сайт",
  ogImage = "/og-image.jpg",
  ogUrl = "https://phax.online",
  type = "website",
  author = "phax"
}) => {
  return (
    <Helmet>
      {/* Базовые мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph (для соцсетей) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Дополнительные SEO-теги */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={ogUrl} />
      
      {/* Структурированные данные (Schema.org) для повышения CTR */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Разработка сайтов и ботов под ключ",
          "description": description,
          "url": ogUrl,
          "logo": `${ogUrl}/logo.png`,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "RU"
          },
          "service": [
            {
              "@type": "Service",
              "name": "Разработка сайтов",
              "description": "Создание сайтов под ключ с современным дизайном и адаптивной версткой"
            },
            {
              "@type": "Service",
              "name": "Telegram боты",
              "description": "Разработка интеллектуальных ботов для автоматизации бизнеса"
            },
            {
              "@type": "Service",
              "name": "Lua скрипты",
              "description": "Создание скриптов для игровых серверов и автоматизации"
            }
          ],
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "RUB",
            "lowPrice": "15000",
            "highPrice": "150000",
            "offerCount": "6"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;