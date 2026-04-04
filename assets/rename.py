import os

BASE_DIR = "img/homepage/arch"  # change if needed

VALID_EXT = (".jpg", ".jpeg", ".png")

for root, dirs, files in os.walk(BASE_DIR):
    folder_name = os.path.basename(root)
    safe_folder = folder_name.replace(" ", "_").lower()

    # Filter valid files
    image_files = [
        f for f in files
        if f.lower().endswith(VALID_EXT) and f.lower() != "thumbs.db"
    ]

    if not image_files:
        continue

    image_files.sort()

    temp_names = []

    # 🔹 STEP 1: rename to temporary names
    for i, file in enumerate(image_files):
        old_path = os.path.join(root, file)
        temp_name = f"temp_{i}{os.path.splitext(file)[1]}"
        temp_path = os.path.join(root, temp_name)

        os.rename(old_path, temp_path)
        temp_names.append(temp_name)

    # 🔹 STEP 2: rename to final names
    for i, temp_name in enumerate(temp_names, start=1):
        ext = os.path.splitext(temp_name)[1]
        new_name = f"{safe_folder}_{i}{ext}"

        old_path = os.path.join(root, temp_name)
        new_path = os.path.join(root, new_name)

        os.rename(old_path, new_path)
        print(f"{temp_name} -> {new_name}")