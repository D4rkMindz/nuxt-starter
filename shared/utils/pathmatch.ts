export function pathMatch(path: string, allowed: string[]): boolean {
    const analyze = (p: string) => {
        const items = (p.split('?')[0] || p).split('/').map((n: string) => n.trim().toLowerCase());
        items.shift()
        const tokens: number[] = []
        items.map((v: string, i: number) => {
            if (v.includes('[')) tokens.push(i);
        })
        return {
            path: p,
            count: items.length,
            foundPositions: tokens,
            items: items,
        }
    }
    const original = analyze(path)
    const analyzed = allowed.map(analyze)
    const exact = analyzed.filter(a => a.path == original.path).length == 1;
    if (exact) {
        return true;
    }
    const single = analyzed
        .filter(a => a.items.filter(i => i.includes('[')).length > 0)
        .filter(a => a.count == original.count)
        .filter(a => a
            .items
            .filter((p: string, i: number) =>
                // compare only if allowed path doesnt start with [
                p.includes('[')
                || p == original.items[i]
            ).length == original.count
        )
    if (single.length == 1) {
        return true;
    }

    const wildcard = analyzed
        .filter(a => a.items[a.items.length - 1] == "*")
        .filter(a => {
            const all = a.items;
            all.pop();
            let match = false;
            original.items.some((p: string, i: number) => {
                if (i >= all.length) {
                    match = true;
                    return true;
                }

                return !(all[i] == p); // keep going if matches
            })
            return match;
        });

    if (wildcard.length == 1) {
        return true;
    }

    return false;
}