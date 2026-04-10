import urllib.request

candidates = [
    # Frozen products
    ("FrozenVeg", "https://images.unsplash.com/photo-1580910051074-3eb694886f4b?q=80&w=600&auto=format&fit=crop"),
    ("FrozenBerries", "https://images.unsplash.com/photo-1563746098251-d35aef196e83?q=80&w=600&auto=format&fit=crop"),
    ("FrozenPeas", "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?q=80&w=600&auto=format&fit=crop"),
    ("FrozenCorn", "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop"),
    ("FrozenOkra", "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?q=80&w=600&auto=format&fit=crop"),
    ("FrozenBroc", "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=600&auto=format&fit=crop"),
    ("FrozenSpin", "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&auto=format&fit=crop"),
    ("FrozenMix", "https://images.unsplash.com/photo-1557844352-761f2565b4c4?q=80&w=600&auto=format&fit=crop"),
    # Processed products
    ("JamJar", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop"),
    ("DriedFruit", "https://images.unsplash.com/photo-1473348328839-e3d4b01d085e?q=80&w=600&auto=format&fit=crop"),
    ("Juice", "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?q=80&w=600&auto=format&fit=crop"),
    ("OliveOil", "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop"),
    ("TomatoPaste", "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=600&auto=format&fit=crop"),
    ("Herbs", "https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=600&auto=format&fit=crop"),
    ("Pickles", "https://images.unsplash.com/photo-1589135233689-3d3d60d0e38c?q=80&w=600&auto=format&fit=crop"),
    ("Honey", "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=600&auto=format&fit=crop"),
    ("DriedHerbs", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop"),
    ("Spices", "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop"),
]

for name, u in candidates:
    try:
        urllib.request.urlopen(u)
        print(f"OK   {name}: {u}")
    except Exception as e:
        print(f"FAIL {name}")
