# ---- Go to the project folder -------------------------------------------------
cd "/F/Mike d drive/Mike Webs/PDC YES/pdcyes-new-website 20jul26/pdcyes-github"

# ---- Stop any hanging node processes and clear .next cache --------------------
tasklist 2>/dev/null | grep -i node | awk '{print $2}' | xargs -r taskkill /PID /F || true
rm -rf .next

# ---- Move SITE files from app/(site) → app/ ------------------------------------
SITE_SRC="app/(site)"
if [ -d "$SITE_SRC" ]; then
    rm -f "$SITE_SRC/layout.tsx"
    find "$SITE_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) | while IFS= read -r src; do
        rel="${src#$SITE_SRC/}"
        dst="app/$rel"
        dst_dir=$(dirname "$dst")
        mkdir -p "$dst_dir"
        mv "$src" "$dst"
    done
    rm -rf "$SITE_SRC"
fi

# ---- Move ADMIN files from app/(admin) → app/admin/ ---------------------------
ADMIN_SRC="app/(admin)"
if [ -d "$ADMIN_SRC" ]; then
    find "$ADMIN_SRC" -type f \( -name "*.ts" -o -name "*.tsx" \) | while IFS= read -r src; do
        rel="${src#$ADMIN_SRC/}"
        dst="app/admin/$rel"
        dst_dir=$(dirname "$dst")
        mkdir -p "$dst_dir"
        mv "$src" "$dst"
    done
    rm -rf "$ADMIN_SRC"
fi

# ---- Replace import strings in all .ts/.tsx files ------------------------------
replace_in_files() {
    local pattern="$1"
    local replacement="$2"
    find . -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 |
        while IFS= read -r -d '' file; do
            if grep -q "$pattern" "$file"; then
                sed -i "s|$pattern|$replacement|g" "$file"
            fi
        done
}
replace_in_files '@/app\(/admin\)/:' '@/app/admin/:/'
replace_in_files '@/app\(/site\)/:' '@/app/:/'
replace_in_files '\.\./\(admin\)/:' '../admin/:/'
replace_in_files '\.\./\(site\)/:' '..//:/'

# ---- Summary -------------------------------------------------------------------
echo ""
echo "✅ Route‑group conflict fixed."
echo "New top‑level folders under app:"
ls -d app/*/ | xargs -n1 basename | sort
echo ""
echo "Next steps:"
echo "  npm install   (if you haven’t already)"