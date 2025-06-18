const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { items, userId } = req.body;
        
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid items' });
        }
        
        // Créer les line items pour Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    images: [item.image],
                    metadata: {
                        id: item.id
                    }
                },
                unit_amount: Math.round(item.price * 100) // Stripe utilise les centimes
            },
            quantity: item.quantity
        }));
        
        // Créer la session Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.DOMAIN}/cart`,
            customer_email: userId ? await getUserEmail(userId) : undefined,
            metadata: {
                userId: userId || 'guest'
            },
            shipping_address_collection: {
                allowed_countries: ['FR', 'BE', 'DE', 'IT', 'ES', 'CH', 'LU', 'NL']
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'eur',
                        },
                        display_name: 'Livraison gratuite',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 3,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 5,
                            },
                        },
                    },
                }
            ],
            allow_promotion_codes: true,
            locale: 'fr'
        });
        
        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: 'Error creating checkout session' });
    }
};

// Fonction pour récupérer l'email de l'utilisateur (à implémenter avec votre système d'authentification)
async function getUserEmail(userId) {
    // Implémentez cette fonction selon votre système d'authentification
    return null;
} 