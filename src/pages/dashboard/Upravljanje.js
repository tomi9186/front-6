import { useEffect, useMemo, useState } from 'react';
import {
    ArrowClockwise,
    ArrowRight,
    BarChart,
    Bell,
    BoxArrowRight,
    Check2,
    ChevronDown,
    ClockHistory,
    CupHot,
    Grid3x3Gap,
    HouseDoor,
    PencilSquare,
    Plus,
    QrCode,
    Receipt,
    Search,
    Sliders,
    Tag,
    Trash,
    X
} from 'react-bootstrap-icons';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../context/AuthContext';
import './Upravljanje.css';

const API_URL = 'https://front6.edukacija.online/backend/wp-json/wp/v2';

const navigation = [
    { id: 'home', label: 'Početna', icon: HouseDoor },
    { id: 'menu', label: 'Jelovnik', icon: Grid3x3Gap },
    { id: 'categories', label: 'Kategorije', icon: Tag },
    { id: 'qr', label: 'QR kodovi', icon: QrCode },
    { id: 'orders', label: 'Narudžbe', icon: Receipt },
    { id: 'analytics', label: 'Analitika', icon: BarChart },
    { id: 'settings', label: 'Postavke', icon: Sliders }
];

async function wpRequest(token, path, options = {}) {
    const response = await fetch(`${API_URL}/${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers
        },
        signal: options.signal
    });

    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error('Server je vratio neispravan odgovor.');
    }

    if (!response.ok) {
        throw new Error(data.message || 'Zahtjev nije uspio. Pokušajte ponovno.');
    }

    return data;
}

function getTitle(post) {
    return post?.title?.rendered || post?.title || 'Bez naziva';
}

function getPublicMenuUrl(venue, venueTypes) {
    if (!venue?.slug) return '';

    const typeId = venue.venue_type?.[0];
    const venueType = venueTypes.find((type) => String(type.id) === String(typeId));
    const route = venueType?.slug === 'kafic' ? 'kafic'
        : venueType?.slug === 'restoran' ? 'restoran'
            : '';

    return route ? `${window.location.origin}/${route}/${encodeURIComponent(venue.slug)}` : '';
}

function getMessage(error) {
    return error instanceof Error ? error.message : 'Došlo je do neočekivane greške.';
}

function Upravljanje() {
    const { token, nadimak, logout } = useAuth();
    const [activePage, setActivePage] = useState('home');
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [venues, setVenues] = useState([]);
    const [venueTypes, setVenueTypes] = useState([]);
    const [selectedVenueId, setSelectedVenueId] = useState('');
    const [printVenueId, setPrintVenueId] = useState('');
    const [venueForm, setVenueForm] = useState({
        title: '',
        venue_type: '',
        venue_address: '',
        venue_city: '',
        venue_phone: '',
        venue_email: ''
    });
    const [itemForm, setItemForm] = useState({
        id: null,
        title: '',
        description: '',
        price: '',
        categoryId: '',
        status: 'publish'
    });
    const [categoryName, setCategoryName] = useState('');
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isItemEditorOpen, setIsItemEditorOpen] = useState(false);
    const [isCategoryEditorOpen, setIsCategoryEditorOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        async function loadDashboard() {
            setLoading(true);
            setError('');
            try {
                const [loadedItems, loadedCategories, loadedVenues, loadedVenueTypes] = await Promise.all([
                    wpRequest(token, 'menu_item?per_page=100&_embed=1', { signal: controller.signal }),
                    wpRequest(token, 'menu_category?per_page=100', { signal: controller.signal }),
                    wpRequest(token, 'venue?per_page=100&_fields=id,slug,title,acf,venue_type', { signal: controller.signal }),
                    wpRequest(token, 'venue_type?per_page=100&_fields=id,name,slug', { signal: controller.signal })
                ]);
                setItems(loadedItems);
                setCategories(loadedCategories);
                setVenues(loadedVenues);
                setVenueTypes(loadedVenueTypes);
                setSelectedVenueId((current) => {
                    if (loadedVenues.some((venue) => String(venue.id) === String(current))) return current;
                    return loadedVenues[0] ? String(loadedVenues[0].id) : '';
                });
            } catch (loadError) {
                if (!controller.signal.aborted) setError(getMessage(loadError));
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        loadDashboard();
        return () => controller.abort();
    }, [token]);

    const selectedVenue = venues.find((venue) => String(venue.id) === String(selectedVenueId));

    useEffect(() => {
        const acf = selectedVenue?.acf || {};
        setVenueForm({
            title: selectedVenue ? getTitle(selectedVenue) : '',
            venue_type: selectedVenue?.venue_type?.[0] ? String(selectedVenue.venue_type[0]) : '',
            venue_address: acf.venue_address || '',
            venue_city: acf.venue_city || '',
            venue_phone: acf.venue_phone || '',
            venue_email: acf.venue_email || ''
        });
    }, [selectedVenue]);

    useEffect(() => {
        if (!printVenueId) return undefined;

        const handleAfterPrint = () => setPrintVenueId('');
        window.addEventListener('afterprint', handleAfterPrint);
        const timeoutId = window.setTimeout(() => window.print(), 100);

        return () => {
            window.clearTimeout(timeoutId);
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    }, [printVenueId]);

    const visibleItems = useMemo(() => {
        const query = search.trim().toLocaleLowerCase('hr');
        return items.filter((item) => {
            const matchesSearch = !query
                || getTitle(item).toLocaleLowerCase('hr').includes(query)
                || (item.content?.rendered || '').toLocaleLowerCase('hr').includes(query);
            const matchesCategory = selectedCategory === 'all'
                || item.menu_category?.includes(Number(selectedCategory));
            return matchesSearch && matchesCategory;
        });
    }, [items, search, selectedCategory]);

    const publishedItems = items.filter((item) => item.status === 'publish');
    const categoryCounts = categories.map((category) => ({
        ...category,
        count: items.filter((item) => item.menu_category?.includes(category.id)).length
    }));

    function showNotice(message) {
        setNotice(message);
        window.setTimeout(() => setNotice(''), 3500);
    }

    function openItemEditor(item) {
        setError('');
        setItemForm(item ? {
            id: item.id,
            title: getTitle(item),
            description: (item.content?.rendered || '').replace(/<[^>]*>/g, '').trim(),
            price: item.acf?.menu_item_price ?? '',
            categoryId: item.menu_category?.[0] ? String(item.menu_category[0]) : '',
            status: item.status === 'publish' ? 'publish' : 'draft'
        } : {
            id: null,
            title: '',
            description: '',
            price: '',
            categoryId: '',
            status: 'publish'
        });
        setIsItemEditorOpen(true);
    }

    async function handleSaveItem(event) {
        event.preventDefault();
        setSaving(true);
        setError('');
        try {
            const payload = {
                title: itemForm.title.trim(),
                content: itemForm.description,
                status: itemForm.status,
                acf: { menu_item_price: Number(itemForm.price) },
                menu_category: itemForm.categoryId ? [Number(itemForm.categoryId)] : []
            };
            const savedItem = await wpRequest(
                token,
                itemForm.id ? `menu_item/${itemForm.id}` : 'menu_item',
                { method: itemForm.id ? 'PUT' : 'POST', body: JSON.stringify(payload) }
            );
            setItems((current) => itemForm.id
                ? current.map((item) => item.id === savedItem.id ? savedItem : item)
                : [savedItem, ...current]);
            setIsItemEditorOpen(false);
            showNotice(itemForm.id ? 'Stavka jelovnika je ažurirana.' : 'Nova stavka je dodana.');
        } catch (saveError) {
            setError(getMessage(saveError));
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteItem(item) {
        if (!window.confirm(`Želite li obrisati stavku „${getTitle(item)}”?`)) return;
        setError('');
        try {
            await wpRequest(token, `menu_item/${item.id}`, { method: 'DELETE' });
            setItems((current) => current.filter((entry) => entry.id !== item.id));
            showNotice('Stavka je obrisana.');
        } catch (deleteError) {
            setError(getMessage(deleteError));
        }
    }

    async function handleAddCategory(event) {
        event.preventDefault();
        setSaving(true);
        setError('');
        try {
            const category = await wpRequest(token, 'menu_category', {
                method: 'POST',
                body: JSON.stringify({ name: categoryName.trim() })
            });
            setCategories((current) => [...current, category]);
            setCategoryName('');
            setIsCategoryEditorOpen(false);
            showNotice('Kategorija je dodana.');
        } catch (categoryError) {
            setError(getMessage(categoryError));
        } finally {
            setSaving(false);
        }
    }

    async function handleSaveVenue(event) {
        event.preventDefault();
        setSaving(true);
        setError('');
        try {
            const payload = {
                title: venueForm.title.trim(),
                status: 'publish',
                venue_type: venueForm.venue_type ? [Number(venueForm.venue_type)] : [],
                acf: {
                    venue_address: venueForm.venue_address,
                    venue_city: venueForm.venue_city,
                    venue_phone: venueForm.venue_phone,
                    venue_email: venueForm.venue_email
                }
            };
            const venue = await wpRequest(
                token,
                selectedVenue ? `venue/${selectedVenue.id}` : 'venue',
                { method: selectedVenue ? 'PUT' : 'POST', body: JSON.stringify(payload) }
            );
            setVenues((current) => selectedVenue
                ? current.map((entry) => entry.id === venue.id ? venue : entry)
                : [...current, venue]);
            setSelectedVenueId(String(venue.id));
            showNotice('Postavke objekta su spremljene.');
        } catch (venueError) {
            setError(getMessage(venueError));
        } finally {
            setSaving(false);
        }
    }

    function renderQrCodes() {
        return (
            <>
                <div className="dashboard-page-heading">
                    <div>
                        <span className="dashboard-eyebrow">ZA VAŠE GOSTE</span>
                        <h1>QR kodovi</h1>
                        <p>Ispišite kodove i postavite ih na stolove kako bi gosti otvorili vaš jelovnik.</p>
                    </div>
                    {venues.length > 1 && (
                        <span className="dashboard-item-count">{venues.length} objekta</span>
                    )}
                </div>
                {!venues.length ? (
                    <section className="dashboard-card">
                        <EmptyState
                            title="Najprije dodajte ugostiteljski objekt"
                            text="QR kod se generira iz javne stranice objekta. Dodajte objekt i odaberite je li kafić ili restoran."
                            action={() => setActivePage('settings')}
                        />
                    </section>
                ) : (
                    <div className={`qr-venues-grid ${printVenueId ? 'is-printing' : ''}`}>
                        {venues.map((venue) => {
                            const url = getPublicMenuUrl(venue, venueTypes);
                            const venueType = venueTypes.find((type) => venue.venue_type?.some(
                                (id) => String(id) === String(type.id)
                            ));
                            const isPrintTarget = String(venue.id) === String(printVenueId);

                            return (
                                <article
                                    className={`dashboard-card qr-venue-card ${isPrintTarget ? 'is-print-target' : ''}`}
                                    data-venue-id={venue.id}
                                    key={venue.id}
                                >
                                    <div className="qr-venue-details">
                                        <span className="dashboard-eyebrow">DIGITALNI JELOVNIK</span>
                                        <h2>{getTitle(venue)}</h2>
                                        <span className="qr-venue-type">{venueType?.name || 'Vrsta objekta nije odabrana'}</span>
                                        {url ? (
                                            <>
                                                <a className="qr-public-url" href={url} target="_blank" rel="noreferrer">{url}</a>
                                                <p>Skeniranjem koda gosti otvaraju javnu stranicu ovog objekta.</p>
                                                <button className="dashboard-primary-button qr-print-button" onClick={() => setPrintVenueId(venue.id)}>
                                                    <QrCode /> Ispiši QR kod
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <p>Za generiranje QR koda odaberite vrstu objekta i provjerite da je objekt objavljen.</p>
                                                <button className="dashboard-light-button qr-print-button" onClick={() => setActivePage('settings')}>
                                                    <Sliders /> Postavi objekt
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    {url && (
                                        <div className="qr-code-frame" aria-label={`QR kod za ${getTitle(venue)}`}>
                                            <QRCodeSVG value={url} size={220} level="H" includeMargin />
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </>
        );
    }

    function renderPage() {
        if (activePage === 'menu') {
            return (
                <>
                    <div className="dashboard-page-heading">
                        <div>
                            <span className="dashboard-eyebrow">VAŠA PONUDA</span>
                            <h1>Jelovnik</h1>
                            <p>Uredite ponudu i cijene koje gosti vide na vašem digitalnom jelovniku.</p>
                        </div>
                        <button className="dashboard-primary-button" onClick={() => openItemEditor(null)}>
                            <Plus /> Dodaj stavku
                        </button>
                    </div>
                    <div className="dashboard-toolbar">
                        <div className="dashboard-search">
                            <Search aria-hidden="true" />
                            <input
                                aria-label="Pretraži jelovnik"
                                placeholder="Pretraži jelovnik..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </div>
                        <select
                            aria-label="Filtriraj po kategoriji"
                            className="dashboard-select"
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                        >
                            <option value="all">Sve kategorije</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <section className="dashboard-card menu-card">
                        <div className="dashboard-card-heading">
                            <div>
                                <h2>Sve stavke</h2>
                                <p>{visibleItems.length} {visibleItems.length === 1 ? 'stavka' : 'stavki'} u ponudi</p>
                            </div>
                            <span className="dashboard-status-pill"><span /> Objavljeno</span>
                        </div>
                        {renderItemList(visibleItems)}
                    </section>
                </>
            );
        }

        if (activePage === 'qr') return renderQrCodes();

        if (activePage === 'categories') {
            return (
                <>
                    <div className="dashboard-page-heading">
                        <div>
                            <span className="dashboard-eyebrow">ORGANIZACIJA</span>
                            <h1>Kategorije</h1>
                            <p>Organizirajte jelovnik u jasne cjeline za svoje goste.</p>
                        </div>
                        <button className="dashboard-primary-button" onClick={() => setIsCategoryEditorOpen(true)}>
                            <Plus /> Nova kategorija
                        </button>
                    </div>
                    <section className="dashboard-card">
                        <div className="dashboard-card-heading">
                            <div><h2>Kategorije jelovnika</h2><p>Prikazuju se kao izbornik na digitalnom jelovniku.</p></div>
                        </div>
                        <div className="category-list">
                            {categories.length ? categoryCounts.map((category) => (
                                <div className="category-row" key={category.id}>
                                    <span className="category-icon"><Tag /></span>
                                    <strong>{category.name}</strong>
                                    <span>{category.count} {category.count === 1 ? 'stavka' : 'stavki'}</span>
                                    <button
                                        className="dashboard-text-button"
                                        onClick={() => {
                                            setSelectedCategory(String(category.id));
                                            setActivePage('menu');
                                        }}
                                    >
                                        Pregledaj <ArrowRight />
                                    </button>
                                </div>
                            )) : <EmptyState title="Još nema kategorija" text="Dodajte kategorije poput Jela, Pića ili Deserta." />}
                        </div>
                    </section>
                </>
            );
        }

        if (activePage === 'orders') {
            return (
                <>
                    <div className="dashboard-page-heading">
                        <div>
                            <span className="dashboard-eyebrow">NARUDŽBE</span>
                            <h1>Upravljanje narudžbama</h1>
                            <p>Na jednom mjestu pratite narudžbe svojih gostiju.</p>
                        </div>
                    </div>
                    <section className="dashboard-card dashboard-empty-card">
                        <span className="dashboard-empty-icon"><Receipt /></span>
                        <h2>Narudžbe još nisu povezane</h2>
                        <p>Vaš WordPress model trenutno nema aktivan tip sadržaja za narudžbe. Ovaj će se ekran prikazati kada se narudžbe uključe.</p>
                    </section>
                </>
            );
        }

        if (activePage === 'analytics') {
            return (
                <>
                    <div className="dashboard-page-heading">
                        <div>
                            <span className="dashboard-eyebrow">PREGLED POSLOVANJA</span>
                            <h1>Analitika</h1>
                            <p>Brzi pregled vaše digitalne ponude.</p>
                        </div>
                        <span className="dashboard-period"><ClockHistory /> Trenutno stanje</span>
                    </div>
                    <div className="dashboard-metrics">
                        <MetricCard label="Ukupno stavki" value={items.length} icon={<Grid3x3Gap />} />
                        <MetricCard label="Objavljeno" value={publishedItems.length} icon={<Check2 />} />
                        <MetricCard label="Kategorije" value={categories.length} icon={<Tag />} />
                    </div>
                    <section className="dashboard-card analytics-card">
                        <div className="dashboard-card-heading">
                            <div><h2>Stavke po kategorijama</h2><p>Broj stavki u svakoj kategoriji jelovnika.</p></div>
                        </div>
                        {categoryCounts.length ? (
                            <div className="category-chart">
                                {categoryCounts.map((category) => {
                                    const maxCount = Math.max(1, ...categoryCounts.map((entry) => entry.count));
                                    return (
                                        <div className="chart-row" key={category.id}>
                                            <span>{category.name}</span>
                                            <div className="chart-track"><span style={{ width: `${Math.max(4, category.count / maxCount * 100)}%` }} /></div>
                                            <strong>{category.count}</strong>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : <EmptyState title="Nema podataka za prikaz" text="Dodajte kategorije i stavke kako bi se ovdje prikazala analitika." />}
                    </section>
                </>
            );
        }

        if (activePage === 'settings') {
            return (
                <>
                    <div className="dashboard-page-heading">
                        <div>
                            <span className="dashboard-eyebrow">VAŠ RAČUN</span>
                            <h1>Postavke objekta</h1>
                            <p>Informacije koje će gosti pronaći na vašem digitalnom jelovniku.</p>
                        </div>
                        {venues.length > 1 && (
                            <label className="venue-picker">
                                <span>Objekt</span>
                                <select value={selectedVenueId} onChange={(event) => setSelectedVenueId(event.target.value)}>
                                    {venues.map((venue) => <option key={venue.id} value={venue.id}>{getTitle(venue)}</option>)}
                                </select>
                                <ChevronDown />
                            </label>
                        )}
                    </div>
                    <form className="dashboard-card venue-form" onSubmit={handleSaveVenue}>
                        <div className="dashboard-card-heading">
                            <div><h2>Osnovne informacije</h2><p>Podaci o vašem ugostiteljskom objektu.</p></div>
                        </div>
                        <div className="dashboard-form-grid">
                            <FormField label="Naziv objekta" name="title" value={venueForm.title} onChange={updateVenueField} required />
                            <label className="dashboard-field">
                                <span>Vrsta objekta</span>
                                <select name="venue_type" value={venueForm.venue_type} onChange={updateVenueField} required>
                                    <option value="">Odaberite vrstu objekta</option>
                                    {venueTypes.map((type) => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </label>
                            <FormField label="Adresa" name="venue_address" value={venueForm.venue_address} onChange={updateVenueField} placeholder="Ulica i kućni broj" />
                            <FormField label="Grad" name="venue_city" value={venueForm.venue_city} onChange={updateVenueField} placeholder="npr. Zagreb" />
                            <FormField label="Broj telefona" name="venue_phone" value={venueForm.venue_phone} onChange={updateVenueField} type="tel" />
                            <FormField label="E-mail adresa" name="venue_email" value={venueForm.venue_email} onChange={updateVenueField} type="email" />
                        </div>
                        <div className="dashboard-form-footer">
                            <span>Promjene će se odmah prikazati na profilu objekta.</span>
                            <button className="dashboard-primary-button" type="submit" disabled={saving}>
                                <Check2 /> {saving ? 'Spremanje...' : 'Spremi promjene'}
                            </button>
                        </div>
                    </form>
                </>
            );
        }

        return (
            <>
                <div className="dashboard-welcome">
                    <div>
                        <span className="dashboard-eyebrow">PREGLED POSLOVANJA</span>
                        <h1>Bok, {nadimak || 'dobrodošli'} <span>👋</span></h1>
                        <p>Evo kratkog pregleda vašeg digitalnog jelovnika.</p>
                    </div>
                    <button className="dashboard-light-button" onClick={() => setActivePage('settings')}>
                        <Sliders /> Uredi objekt
                    </button>
                </div>
                <div className="dashboard-hero-card">
                    <div className="dashboard-hero-copy">
                        <span className="dashboard-hero-kicker"><span /> VAŠ DIGITALNI JELOVNIK</span>
                        <h2>{selectedVenue ? getTitle(selectedVenue) : 'Dobrodošli u MENUTO'}</h2>
                        <p>{selectedVenue?.acf?.venue_city || 'Dodajte informacije o objektu i predstavite svoju ponudu gostima.'}</p>
                        <button onClick={() => setActivePage('menu')}>Uredi jelovnik <ArrowRight /></button>
                    </div>
                    <div className="dashboard-hero-art" aria-hidden="true">
                        <div className="hero-art-circle" />
                        <div className="hero-art-phone">
                            <span className="hero-art-notch" />
                            <CupHot />
                            <strong>Vaš jelovnik</strong>
                            <span className="hero-art-line" />
                            <span className="hero-art-line short" />
                            <span className="hero-art-line" />
                        </div>
                        <QrCode className="hero-art-qr" />
                    </div>
                </div>
                <div className="dashboard-metrics">
                    <MetricCard label="Stavke jelovnika" value={items.length} icon={<Grid3x3Gap />} action={() => setActivePage('menu')} />
                    <MetricCard label="Aktivne stavke" value={publishedItems.length} icon={<Check2 />} action={() => setActivePage('menu')} />
                    <MetricCard label="Kategorije" value={categories.length} icon={<Tag />} action={() => setActivePage('categories')} />
                </div>
                <section className="dashboard-card dashboard-recent">
                    <div className="dashboard-card-heading">
                        <div><h2>Nedavno uređivano</h2><p>Vaše posljednje stavke u jelovniku.</p></div>
                        <button className="dashboard-text-button" onClick={() => setActivePage('menu')}>Cijeli jelovnik <ArrowRight /></button>
                    </div>
                    {renderItemList(items.slice(0, 3), true)}
                    {!items.length && <EmptyState title="Vaš jelovnik je spreman za uređivanje" text="Dodajte prvu stavku kako biste započeli s digitalnom ponudom." action={() => openItemEditor(null)} />}
                </section>
            </>
        );
    }

    function updateVenueField(event) {
        const { name, value } = event.target;
        setVenueForm((current) => ({ ...current, [name]: value }));
    }

    function renderItemList(list, compact = false) {
        if (!list.length) {
            return <EmptyState title="Nema pronađenih stavki" text="Dodajte stavku ili promijenite kriterije pretraživanja." />;
        }

        return (
            <div className={`menu-item-list ${compact ? 'is-compact' : ''}`}>
                {list.map((item) => {
                    const category = categories.find((entry) => item.menu_category?.includes(entry.id));
                    const image = item._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                    return (
                        <article className="menu-item-row" key={item.id}>
                            <div className="menu-item-thumb">
                                {image ? <img src={image} alt="" /> : <CupHot aria-hidden="true" />}
                            </div>
                            <div className="menu-item-info">
                                <strong>{getTitle(item)}</strong>
                                <span>{category?.name || 'Bez kategorije'}{item.status !== 'publish' ? ' · Skica' : ''}</span>
                            </div>
                            <strong className="menu-item-price">
                                {item.acf?.menu_item_price !== undefined && item.acf?.menu_item_price !== ''
                                    ? `${Number(item.acf.menu_item_price).toFixed(2).replace('.', ',')} €`
                                    : '—'}
                            </strong>
                            <div className="menu-item-actions">
                                <button aria-label={`Uredi ${getTitle(item)}`} onClick={() => openItemEditor(item)}><PencilSquare /></button>
                                <button aria-label={`Obriši ${getTitle(item)}`} onClick={() => handleDeleteItem(item)}><Trash /></button>
                            </div>
                        </article>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={`menuto-dashboard ${printVenueId ? 'is-printing' : ''}`}>
            <aside className="menuto-sidebar">
                <a className="dashboard-brand" href="/" aria-label="MENUTO početna">
                    <span className="dashboard-brand-mark">✦</span> MENUTO
                </a>
                <div className="dashboard-nav-label">RADNI PROSTOR</div>
                <nav className="dashboard-nav" aria-label="Navigacija upravljanja">
                    {navigation.map(({ id, label, icon: Icon }) => (
                        <button
                            aria-label={label}
                            className={activePage === id ? 'is-active' : ''}
                            key={id}
                            onClick={() => {
                                setActivePage(id);
                                setError('');
                            }}
                        >
                            <Icon aria-hidden="true" />
                            <span>{label}</span>
                            {id === 'orders' && <span className="nav-soon">uskoro</span>}
                        </button>
                    ))}
                </nav>
                <div className="dashboard-sidebar-bottom">
                    <div className="dashboard-help-card">
                        <span className="dashboard-help-icon"><QrCode /></span>
                        <strong>Trebaš pomoć?</strong>
                        <span>Pogledaj kako MENUTO radi.</span>
                        <a href="/kako-funkcionira">Saznaj više <ArrowRight /></a>
                    </div>
                    <button className="dashboard-account" onClick={logout} aria-label="Odjava">
                        <span className="dashboard-avatar">{(nadimak || 'M').slice(0, 1).toUpperCase()}</span>
                        <span className="dashboard-account-name"><strong>{nadimak || 'Moj račun'}</strong><small>Osobni račun</small></span>
                        <BoxArrowRight aria-label="Odjava" />
                    </button>
                </div>
            </aside>

            <main className="dashboard-main">
                <header className="menuto-dashboard-topbar">
                    <div className="dashboard-breadcrumb"><span>Radni prostor</span><span>/</span><strong>{navigation.find((item) => item.id === activePage)?.label}</strong></div>
                    <div className="dashboard-topbar-actions">
                        {selectedVenue && (
                            <button className="dashboard-venue-chip" onClick={() => setActivePage('settings')}>
                                <span className="venue-chip-dot" /> {getTitle(selectedVenue)} <ChevronDown />
                            </button>
                        )}
                        <button className="dashboard-icon-button" aria-label="Osvježi podatke" onClick={() => window.location.reload()}>
                            <ArrowClockwise />
                        </button>
                        <button
                            className="dashboard-icon-button dashboard-notification"
                            aria-label="Obavijesti"
                            onClick={() => showNotice('Trenutno nema novih obavijesti.')}
                        >
                            <Bell /><span />
                        </button>
                        <button className="dashboard-mobile-logout" onClick={logout} aria-label="Odjava"><BoxArrowRight /></button>
                    </div>
                </header>
                <div className="menuto-dashboard-content">
                    {error && (
                        <div className="dashboard-alert" role="alert">
                            <span>{error}</span>
                            <button onClick={() => setError('')} aria-label="Zatvori poruku"><X /></button>
                        </div>
                    )}
                    {notice && <div className="dashboard-notice" role="status"><Check2 /> {notice}</div>}
                    {loading ? (
                        <div className="dashboard-loading"><span className="dashboard-spinner" /> Učitavanje vaših podataka...</div>
                    ) : renderPage()}
                </div>
            </main>

            {isItemEditorOpen && (
                <div className="dashboard-modal-backdrop" role="presentation" onMouseDown={(event) => {
                    if (event.target === event.currentTarget) setIsItemEditorOpen(false);
                }}>
                    <section className="dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="item-editor-title">
                        <div className="dashboard-modal-heading">
                            <div><span className="dashboard-eyebrow">JELOVNIK</span><h2 id="item-editor-title">{itemForm.id ? 'Uredi stavku' : 'Nova stavka'}</h2></div>
                            <button className="dashboard-modal-close" onClick={() => setIsItemEditorOpen(false)} aria-label="Zatvori"><X /></button>
                        </div>
                        <form onSubmit={handleSaveItem}>
                            <FormField label="Naziv stavke" name="title" value={itemForm.title} onChange={(event) => setItemForm((current) => ({ ...current, title: event.target.value }))} placeholder="npr. Burger klasik" required />
                            <label className="dashboard-field">
                                <span>Opis</span>
                                <textarea
                                    rows="3"
                                    value={itemForm.description}
                                    onChange={(event) => setItemForm((current) => ({ ...current, description: event.target.value }))}
                                    placeholder="Opišite sastojke i posebnosti jela..."
                                />
                            </label>
                            <div className="dashboard-form-grid">
                                <FormField label="Cijena (€)" name="price" type="number" min="0" step="0.01" value={itemForm.price} onChange={(event) => setItemForm((current) => ({ ...current, price: event.target.value }))} placeholder="0,00" required />
                                <label className="dashboard-field">
                                    <span>Kategorija</span>
                                    <select value={itemForm.categoryId} onChange={(event) => setItemForm((current) => ({ ...current, categoryId: event.target.value }))}>
                                        <option value="">Odaberite kategoriju</option>
                                        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                                    </select>
                                </label>
                            </div>
                            <label className="dashboard-field">
                                <span>Status</span>
                                <select value={itemForm.status} onChange={(event) => setItemForm((current) => ({ ...current, status: event.target.value }))}>
                                    <option value="publish">Objavljeno</option>
                                    <option value="draft">Skica</option>
                                </select>
                            </label>
                            <div className="dashboard-modal-footer">
                                <button className="dashboard-light-button" type="button" onClick={() => setIsItemEditorOpen(false)}>Odustani</button>
                                <button className="dashboard-primary-button" type="submit" disabled={saving}>
                                    <Check2 /> {saving ? 'Spremanje...' : 'Spremi stavku'}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}

            {isCategoryEditorOpen && (
                <div className="dashboard-modal-backdrop" role="presentation" onMouseDown={(event) => {
                    if (event.target === event.currentTarget) setIsCategoryEditorOpen(false);
                }}>
                    <section className="dashboard-modal dashboard-category-modal" role="dialog" aria-modal="true" aria-labelledby="category-editor-title">
                        <div className="dashboard-modal-heading">
                            <div><span className="dashboard-eyebrow">ORGANIZACIJA</span><h2 id="category-editor-title">Nova kategorija</h2></div>
                            <button className="dashboard-modal-close" onClick={() => setIsCategoryEditorOpen(false)} aria-label="Zatvori"><X /></button>
                        </div>
                        <form onSubmit={handleAddCategory}>
                            <FormField label="Naziv kategorije" name="category" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="npr. Deserti" required />
                            <div className="dashboard-modal-footer">
                                <button className="dashboard-light-button" type="button" onClick={() => setIsCategoryEditorOpen(false)}>Odustani</button>
                                <button className="dashboard-primary-button" type="submit" disabled={saving}><Plus /> {saving ? 'Dodavanje...' : 'Dodaj kategoriju'}</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
}

function FormField({ label, name, value, onChange, type = 'text', ...inputProps }) {
    return (
        <label className="dashboard-field">
            <span>{label}</span>
            <input name={name} type={type} value={value} onChange={onChange} {...inputProps} />
        </label>
    );
}

function MetricCard({ label, value, icon, action }) {
    return (
        <button className={`dashboard-metric-card ${action ? 'is-clickable' : ''}`} onClick={action} type="button" disabled={!action}>
            <span className="metric-icon">{icon}</span>
            <span className="metric-copy"><small>{label}</small><strong>{value}</strong></span>
            {action && <ArrowRight className="metric-arrow" />}
        </button>
    );
}

function EmptyState({ title, text, action }) {
    return (
        <div className="dashboard-empty-state">
            <span className="dashboard-empty-icon"><CupHot /></span>
            <strong>{title}</strong>
            <p>{text}</p>
            {action && <button className="dashboard-text-button" onClick={action}>Dodaj prvu stavku <ArrowRight /></button>}
        </div>
    );
}

export default Upravljanje;
