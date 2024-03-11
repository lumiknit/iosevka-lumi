-- Clone original repository
os.execute("git clone --depth=1 https://github.com/be5invis/Iosevka")

-- Install dependencies
os.execute("cd Iosevka && npm install")

-- Build targets

local pascalToCamel = function(str)
	t = {}
	for s in string.gmatch(str, "([^-]+)") do
		-- Make first letter uppercase
		s = string.gsub(s, "^%l", string.upper)
		table.insert(t, s)
	end
	-- Join and return
	return table.concat(t)
end

targets = {
	"qp-lumi",
	"term-lumi",
	"qp-knit",
	"term-knit",
}

for k, t in pairs(targets) do
	-- Build target
	script = "cd Iosevka && cp ../" .. t .. ".toml ./private-build-plans.toml && npm run build -- contents::Iosevka" .. pascalToCamel(t)
	print("RUN: " .. script)
	os.execute(script)
end

-- Copy files to output directory
os.execute("mv ./Iosevka/dist .")
