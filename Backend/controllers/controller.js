const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        
    database: 'vizsgaremek',
});

const getAllOrder = async (req, res) => {
    try {

        db.query('SELECT * FROM order JOIN Kategoria ON orders.kategoria_id = Kategoria.id', (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Hiba történt a lekérdezéskor!' });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ error: 'Hiba történt a lekérdezéskor!' });
    }
};


// Új Order rögzítése
// req => request(kérés)
// res => response(válasz)
const createOrder = async (req, res) => {
    const { kategoria, leiras, ar, kepUrl } = req.body;
    if (!kategoria || !leiras || !ar || !kepUrl){
        return res.status(400).json({error: "Hiányos adatok"});
    }
    try{
        const newOrder = await prisma.orders.create({
            data: {
                kategoria,
                leiras,
                ar,
                kepUrl,
                hirdetesDatuma: new Date(),
                tehermentes: false,
            },
        });
        res.status(201).json(newOrder);
    }
    catch(error){
        res.status(500).json({
            error: "Hiba az Order adatainak rögzítésekor"
        });
    }
}

//Order törlése
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const order = await prisma.orders.findUnique({
        where: { id: parseInt(id) },
    });
    try{
        const deletedOrder = await prisma.orders.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(204);
    }
    catch(error){
        res.status(404).json({ error: "Order nem létezik"});
    }
}

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try{
        const order = await prisma.orders.findUnique(
            {
                where : { id: parseInt(id) },
                data,
            }
        );
        if (!order){
            return res.status(400).json({ error: 'Nem található ilyen order' });
        }
        // Frissítés
        const updateOrder = await prisma.orders.update({
            where: { id: parseInt(id) },
            data,
        });
        res.status(200).json(updateOrder);
    }
    catch(error){
        res.status(500).json({ error: "Hiba az order frissítése során" });
    }
}
module.exports = {
    getAllOrder, 
    createOrder,
    deleteOrder,
    updateOrder
}
