import os
import requests
import json
from time import sleep

# === Config ===
API_KEY = "live_YZqOd7eQTWB8Xzy4rgbbODc6BdMABR33Tj3mv4ExyrFNJsOYXtbi5hFKILLl0mWR"
API_URL = "https://api.thedogapi.com/v1/images/search"
JSON_PATH = "pet-social-media/frontend/public/adoptPets/adoptPets.json"
OUTPUT_FOLDER = "pet-social-media/frontend/public/adoptPets/dogs"
HEADERS = {"x-api-key": API_KEY}

# === Setup ===
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

with open(JSON_PATH, "r") as f:
    pets = json.load(f)

# Filter for dogs
dog_pets = [pet for pet in pets if pet.get("type") == "Dog"]

# === Download ===
start_index = 31  # Start numbering from 31
for i, pet in enumerate(dog_pets, start=start_index):
    breed_name = pet.get("breed", "").lower().replace(" ", "-")

    # Fetch 4 images for this breed
    try:
        res = requests.get(
            f"{API_URL}?limit=4&q={breed_name}",
            headers=HEADERS
        )
        res.raise_for_status()
        images = res.json()
    except Exception as e:
        print(f"[{i}] Failed to fetch images for {breed_name}: {e}")
        continue

    if len(images) < 4:
        print(f"[{i}] Only got {len(images)} images for {breed_name}, skipping...")
        continue

    # Save the images
    for j, img in enumerate(images):
        try:
            img_data = requests.get(img["url"]).content
            if j == 0:
                filename = f"{i}.jpg"
            else:
                filename = f"{i}_pic{j}.jpg"

            with open(os.path.join(OUTPUT_FOLDER, filename), "wb") as f:
                f.write(img_data)

            print(f"Saved {filename}")
        except Exception as e:
            print(f"Failed to save image {j} for pet {i}: {e}")

    sleep(0.5)  # to avoid rate-limiting

print("\n✅ Done downloading all dog images.")
