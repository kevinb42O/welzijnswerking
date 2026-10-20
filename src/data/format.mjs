export const formatEventDate = (date, timezone) => new Intl.DateTimeFormat('nl-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: timezone }).format(new Date(`${date}T12:00:00Z`));
export const formatPrice = value => `€ ${value.toLocaleString('nl-BE')}`;
