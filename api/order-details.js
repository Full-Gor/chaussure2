const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { session_id } = req.query;
    
    if (!session_id) {
        return res.status(400).json({ error: 'Session ID is required' });
    }
    
    try {
        // Récupérer la session
        const session = await stripe.checkout.sessions.retrieve(session_id);
        
        // Récupérer le paiement
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        
        // Retourner les détails de la commande
        res.status(200).json({
            orderId: session.payment_intent.slice(-8),
            created: session.created * 1000, // Convertir en millisecondes
            amount_total: session.amount_total,
            customer_email: session.customer_details?.email,
            shipping: session.shipping_details,
            payment_status: paymentIntent.status
        });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: 'Error retrieving order details' });
    }
}; 